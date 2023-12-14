import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Estado} from "@isc/api/estado";
import {Unidad} from "@isc/api/unidad";
import {Folio} from "@isc/api/Folio";
import {Area} from "@isc/api/area";
import {Paginador} from "@isc/toolkit/paginador";
import {MessageService} from "primeng/api";
import {ErrorService} from "@isc/core/error.service";
import {UnidadService} from "@isc/api/unidad.service";
import {EstadoService} from "@isc/api/estado.service";
import {AreaService} from "@isc/api/area.service";
import {FolioService} from "@isc/api/folio.service";
import {DatePipe} from "@angular/common";
import {FiltroFolio} from "@isc/toolkit/filtro-folio";
import {HttpStatusCode} from "@angular/common/http";
import {Table} from "primeng/table";

@Component({
  selector: 'app-administrar', templateUrl: './administrar.component.html', styleUrl: './administrar.component.scss'
})
export class AdministrarComponent implements OnInit {
  @ViewChild('filtro') filter!: ElementRef;
  filtrar!: boolean;
  folioSeleccionado!: any;
  folios!: Folio[];
  formFolio!: FormGroup;
  formFiltro!: FormGroup;
  estados!: Estado[];
  unidades!: Unidad[];
  areas!: Area[];
  fechaHoy!: Date;
  infoTabla!: Paginador;
  formFecha!: FormGroup;
  cargandoTabla!: boolean;

  constructor(private messageService: MessageService, private appError: ErrorService, private unidadService: UnidadService, private estadoService: EstadoService, private areaService: AreaService, private folioService: FolioService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.inicializarFecha()
    this.infoTabla = {
      filas: 100, pagina: 0, totalElementos: 0
    }
    this.formFecha = this.formBuilder.group({fecha: [this.fechaHoy, Validators.required]})
    this.formFolio = this.formBuilder.group({folio: ['', Validators.required]})
    this.formFiltro = this.formBuilder.group({unidad: null, estado: null, area: null})
    console.log("constructor")
  }

  editarFolio(folio: any) {

  }

  eliminarFolio(data: any) {

  }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.consultarFoliosPorFiltro();
    this.obtenerUnidades();
    this.obtenerAreas()
    this.obtenerEstados();
  }

  obtenerFiltroConsulta() {
    let data: FiltroFolio = {
      fecha: this.datePipe.transform(this.formFecha?.get('fecha')?.value, 'yyyy-MM-ddTHH:mm:ss')!,
      unidad: this.formFiltro.get('unidad')?.value?.id,
      estado: this.formFiltro?.get('estado')?.value?.id,
      area: this.formFiltro?.get('area')?.value?.id,
      folio: this.formFolio?.get('folio')?.value,
      pagina: this.infoTabla.pagina,
      filas: this.infoTabla.filas,
    }
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined) {
        delete data[key as keyof FiltroFolio];
      }
    });
    return data
  }

  obtenerFechaConsulta() {
    console.log("fechaConsulta")
    return this.datePipe.transform(this.formFecha?.get('fecha')?.value, 'dd-MM-yyyy');
  }

  consultarFoliosPorFiltro() {
    console.log("consultarReportes")
    this.folios = []
    this.cargandoTabla = true;
    this.folioService.obtenerFolios(this.obtenerFiltroConsulta()).subscribe({
      next: (response) => {
        if (response.code === HttpStatusCode.NoContent) {
          this.messageService.clear('server');
          this.messageService.add({
            key: 'server',
            severity: 'info',
            summary: `Consulta desde el ${this.obtenerFechaConsulta()}`,
            detail: response.message
          });
        } else {
          this.folios = response.data
        }
      }, complete: () => this.cargandoTabla = false, error: (err) => {
        this.cargandoTabla = false
        this.appError.handleHttpError(err)
      }
    })

  }

  consultarPorFolio() {
    this.folios = []
    this.cargandoTabla = true
    this.folioService.obtenerPorFolio(this.formFolio?.get('folio')?.value).subscribe({
      next: value => {
        if (value.code === HttpStatusCode.NoContent) {
          this.messageService.clear('server');
          this.messageService.add({
            key: 'server',
            severity: 'warn',
            summary: `Folio: ${this.formFolio?.get('folio')?.value}`,
            detail: value.message
          });
        } else {
          this.folios.push(value.data)
        }
      }, complete: () => this.cargandoTabla = false, error: (err) => {
        this.cargandoTabla = false
        this.appError.handleHttpError(err)
      }
    })
  }

  restablecerTabla(dt: Table) {
    dt.clear()
    this.filter.nativeElement.value = '';
    this.formFolio.reset()
    this.consultarFoliosPorFiltro()
  }

  resetFiltro() {
    this.formFiltro.reset()
    this.consultarFoliosPorFiltro()
  }

  private inicializarFecha() {
    let month = new Date()
    this.fechaHoy = new Date(month.getFullYear(), month.getMonth(), 1)
  }

  private obtenerUnidades() {
    this.unidadService.obtenerUnidades().subscribe({
      next: value => {
        this.unidades = value.data
      }
    })
  }

  private obtenerAreas() {
    this.areaService.obtenerAreas().subscribe({
      next: value => {
        this.areas = value.data
      }
    })
  }

  private obtenerEstados() {
    this.estadoService.obtenerEstado().subscribe({
      next: value => {
        this.estados = value.data
      }
    })
  }
}
