import {ButtonModule} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {DatePipe, NgClass} from "@angular/common";
import {Header} from "@isc/core/widgets/title/header";
import {ErrorComponent} from "@isc/core/widgets/error/error.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MenuItem, SharedModule} from "primeng/api";
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
import {SplitButtonModule} from "primeng/splitbutton";
import {SidebarModule} from "primeng/sidebar";
import {Ticket} from "@isc/core/ticket/ticket";
import {TicketComponent} from "@isc/core/ticket/ticket.component";

@Component({
   providers: [DatePipe],
   selector: 'app-administrar',
   templateUrl: './administrar.component.html',
   styleUrl: './administrar.component.scss',
   standalone: true,
   imports: [Header, ErrorComponent, ButtonModule, RouterLink, ReactiveFormsModule, DropdownModule, SharedModule, NgClass, CalendarModule, InputGroupModule, InputTextModule, TableModule, PaginatorModule, SplitButtonModule, SidebarModule, TicketComponent]
})
export class AdministrarComponent implements OnInit, OnDestroy {
   @ViewChild('inFiltro') filter!: ElementRef;
   paginador = {
      first: 0, rows: 100, page: 0, totalElements: 0, pageCount: 0
   }

   // Formularios
   formFiltro!: FormGroup
   formFecha!: FormGroup
   formFolio!: FormGroup
   //Variable de datos
   unidades!: Unidad[]
   areas!: Area[]
   estados!: Estado[]
   folios: Folio[];

   cargandoTabla: boolean = true;
   panelFiltro: boolean = false
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
   private mes: Date;

   items: MenuItem[];
   activarDetalleFolio: boolean;
   ticket: Ticket;

   constructor(private builder: FormBuilder, private datePipe: DatePipe, private router: Router) {
      this.items = [{
         label: 'Seguimiento',
         icon: 'pi pi-file-edit',
         command: () => {
            console.log('Seguimiento')
         }
      }];
      this.asignarMesConsulta()
      this.formFecha = this.builder.group({fecha: [this.mes, Validators.required]})
      this.formFolio = this.builder.group({folio: ['', Validators.required]})
      this.formFiltro = this.builder.group({unidad: null, estado: null, area: null})
      this.obtenerFoliosPorFiltro();
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
      this.mes = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
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

   evtFiltrar() {
      this.panelFiltro = !this.panelFiltro
      this.formFiltro.reset()
   }

   resetTabla(dt: Table) {
      this.filter.nativeElement.value = '';
      dt.clear()
      this.formFolio.reset()
      this.obtenerFoliosPorFiltro()
   }

   editar(data: string) {
      this.folioSubscription = this.folioService.obtenerDetalles(data).subscribe(
         {
            next: r => {
               this.ticket = {
                  folio:r.data.folio,
                  reporte:r.data.reporte.nombre,
                  nota: r.data.nota,
                  data: [{title: 'Unidad', content: r.data.unidad.clave + ' ' + r.data.unidad.nombre},
                     {title: 'Área de seguimiento', content: r.data.reporte.area.nombre},
                     {title: 'Agente', content: r.data.agente == null ? '' : r.data.agente},
                     {
                        title: 'Estado',
                        content: r.data.estado.nombre,
                        style: 'reporte estado-' + r.data.estado.nombre.toLowerCase()
                     },
                     {title: 'Fecha de registro', content: r.data.fecha}]
               }
               this.activarDetalleFolio = true
            }
         }
      )
   }

   eliminar(data: any) {

   }

   onPageChange(event) {
      this.paginador.first = event.first;
      this.paginador.page = event.page
      this.paginador.rows = event.rows;
      this.obtenerFoliosPorFiltro()
   }

   evtFiltro() {
      this.resetPaginador()
      this.obtenerFoliosPorFiltro()
   }

   resetPaginador() {
      this.paginador.page = 0;
      this.paginador.totalElements = 0
      this.paginador.first = 0
      this.paginador.pageCount = 0
   }

   protected obtenerFolio() {
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
         }, error: err => {
            this.cargandoTabla = false
            this.resetPaginador()
            this.folios = []
         }, complete: () => {
            this.cargandoTabla = false
         }
      })
   }

   protected obtenerFoliosPorFiltro() {
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

   protected resetFiltro() {
      this.formFiltro.reset()
      this.obtenerFoliosPorFiltro()
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

   nuevoFolio() {
      this.router.navigate(['/registrar']);
   }
}
