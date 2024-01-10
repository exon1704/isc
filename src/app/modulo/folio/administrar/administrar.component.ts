import {ButtonModule} from "primeng/button";
import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DatePipe, NgClass} from "@angular/common";
import {Header} from "@isc/core/widgets/title/header";
import {ErrorComponent} from "@isc/core/widgets/error/error.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {Table, TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {ErrorService} from "@isc/core/widgets/error/error.service";
import {UnidadService} from "@isc/api/unidad.service";
import {Unidad} from "@isc/api/unidad";
import {Area} from "@isc/api/area";
import {Estado} from "@isc/api/estado";
import {Folio} from "@isc/api/folio";
import {AdministrarHandlerService} from "@isc/modulo/service/administrar-handler.service";
import {EstadoService} from "@isc/api/estado.service";
import {FolioService} from "@isc/api/folio.service";
import {AreaService} from "@isc/api/area.service";
import {Subscription} from "rxjs";
import {FiltroFolio} from "@isc/core/commons/filtro-folio";
import {SidebarModule} from "primeng/sidebar";
import {TicketComponent} from "@isc/core/ticket/ticket.component";
import {Ticket} from "@isc/core/commons/ticket";
import {FolioUtils} from "@isc/core/commons/folio-utils";
import {RouterLink} from "@angular/router";
import {Paginator} from "@isc/core/commons/paginator";

@Component({
   providers: [DatePipe],
   selector: 'app-administrar',
   templateUrl: './administrar.component.html',
   styleUrl: './administrar.component.scss',
   standalone: true,
   imports: [Header, ErrorComponent, ButtonModule, ReactiveFormsModule, DropdownModule, NgClass, CalendarModule, InputGroupModule, InputTextModule, TableModule, PaginatorModule, SidebarModule, TicketComponent, RouterLink]
})
export class AdministrarComponent implements OnInit, OnDestroy {
   @ViewChild('inputFiltro') inputFiltro!: ElementRef;
   protected paginador: Paginator = {

      first: 0, rows: 50, page: 0, totalElements: 0, pageCount: 0
   }

   // Formularios
   protected formFiltro!: FormGroup
   protected formFecha!: FormGroup
   protected formFolio!: FormGroup
   //Variable de datos
   protected unidades!: Unidad[]
   protected areas!: Area[]
   protected estados!: Estado[]
   protected folios: Folio[];

   protected cargandoTabla: boolean = true;
   protected activarFiltro: boolean = false
   protected activarDetalleFolio: boolean;
   protected ticketSeleccionado: Ticket;
   protected errorService = inject(ErrorService);
   // Subscriptores y observables
   private adminHandlerService = inject(AdministrarHandlerService)
   private unidadService = inject(UnidadService)
   private estadoService = inject(EstadoService)
   private folioService = inject(FolioService)
   private areaService = inject(AreaService)
   private areaSubscription: Subscription
   private unidadSubscription: Subscription
   private estadoSubscription: Subscription
   private folioSubscription: Subscription
   private mesConsulta: Date;

   constructor(private builder: FormBuilder, private datePipe: DatePipe) {
      this.asignarMesConsulta()
      this.formFecha = this.builder.group({fecha: [this.mesConsulta, Validators.required]})
      this.formFolio = this.builder.group({folio: ['', Validators.required]})
      this.formFiltro = this.builder.group({unidad: null, estado: null, area: null})
      this.consultarFoliosPorFiltro();
      this.obtenerAreas()
      this.obtenerUnidades()
      this.obtenerEstados()
   }

   ngOnDestroy(): void {
      this.areaSubscription?.unsubscribe()
      this.estadoSubscription?.unsubscribe()
      this.unidadSubscription?.unsubscribe()
      this.folioSubscription?.unsubscribe()
   }

   ngOnInit() {
      this.errorService.clearAll()
   }

   asignarMesConsulta() {
      let fecha = new Date()
      this.mesConsulta = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
   }

   generarFiltro() {
      let data: FiltroFolio = {
         fecha: this.datePipe.transform(this.formFecha?.get('fecha')?.value, 'yyyy-MM-ddTHH:mm:ss')!,
         unidad: this.formFiltro.get('unidad')?.value?.id,
         estado: this.formFiltro?.get('estado')?.value?.id,
         area: this.formFiltro?.get('area')?.value?.id,
         folio: this.formFolio?.get('folio')?.value,
         pagina: this.paginador.page,
         filas: this.paginador.rows,
      }
      Object.entries(data).forEach(([key, value]) => {
         if (value === undefined) {
            delete data[key as keyof FiltroFolio];
         }
      });
      return data
   }

   evtEstadoFiltro() {
      this.activarFiltro = !this.activarFiltro
      this.formFiltro.reset()
   }

   refreshTablaFolio(dt: Table) {
      this.inputFiltro.nativeElement.value = '';
      dt.clear()
      this.formFolio.reset()
      this.consultarFoliosPorFiltro()
   }

   mostrarTicket(data: string) {
      this.folioSubscription = this.folioService.obtenerDetalles(data).subscribe({
         next: r => {
            this.ticketSeleccionado = FolioUtils.convertirFolioTicket(r.data)
            this.activarDetalleFolio = true
         }
      })
   }

   eliminar(data: any) {

   }

   onPageChange(event: any) {
      this.paginador.first = event.first;
      this.paginador.page = event.page
      this.paginador.rows = event.rows;
      this.consultarFoliosPorFiltro()
   }

   evtConsultarFiltro() {
      this.resetPaginador()
      this.consultarFoliosPorFiltro()
   }

   resetPaginador() {
      this.paginador.page = 0;
      this.paginador.totalElements = 0
      this.paginador.first = 0
      this.paginador.pageCount = 0
   }

   evtBtnResetTabla() {
      this.formFiltro.reset()
      this.resetPaginador()
      this.consultarFoliosPorFiltro()
   }

   protected consultarFolio() {
      this.cargandoTabla = true
      this.folioService.obtenerPorFolio(this.formFolio?.get('folio')?.value).subscribe({
         next: value => {
            this.folios = []
            this.paginador.totalElements = 0;
            if (value.code != 204) {
               console.log(value)
               this.folios.push(value.data)
               this.paginador.first = 0
               this.paginador.totalElements = 1
            }
            console.log(value)
         }, error: () => {
            this.cargandoTabla = false
            this.resetPaginador()
            this.folios = []
         }, complete: () => {
            this.cargandoTabla = false
         }
      })
   }

   protected consultarFoliosPorFiltro() {
      this.cargandoTabla = true
      this.folioSubscription = this.folioService.obtenerFolios(this.generarFiltro()).subscribe({
         next: value => {
            this.folios = []
            if (value.code == 200) {
               this.paginador.totalElements = value.page.totalElements
               this.folios = value.data
            } else {
               this.resetPaginador()
            }
         }, error: err => {
            this.cargandoTabla = false
            this.resetPaginador()
            this.folios = []
            this.adminHandlerService.httpHandlerServiceError(err, "Folios de operación", true)
         }, complete: () => {
            this.cargandoTabla = false
         }
      })
   }

   private obtenerAreas() {
      this.areaSubscription = this.areaService.obtenerAreas().subscribe({
         next: (t) => this.areas = t.data, error: (err) => {
            this.adminHandlerService.httpHandlerServiceError(err, 'Areas', true);
         }
      });
   }

   private obtenerUnidades() {
      this.unidadSubscription = this.unidadService.obtenerUnidades().subscribe({
         next: (t) => this.unidades = t.data, error: (err) => {
            this.adminHandlerService.httpHandlerServiceError(err, 'Unidades', true);
         }
      });
   }

   private obtenerEstados() {
      this.estadoSubscription = this.estadoService.obtenerEstado().subscribe({
         next: (t) => this.estados = t.data, error: (err) => {
            this.adminHandlerService.httpHandlerServiceError(err, 'Estados de operación', true);
         }
      });
   }
}
