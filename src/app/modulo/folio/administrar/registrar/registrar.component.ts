import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MensajeData} from "@isc/toolkit/mensaje.data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unidad} from "@isc/api/unidad";
import {Reporte} from "@isc/api/reporte";
import {Estado} from "@isc/api/estado";
import {FolioService} from "@isc/api/folio.service";
import {MessageService} from "primeng/api";
import {UnidadService} from "@isc/api/unidad.service";
import {EstadoService} from "@isc/api/estado.service";
import {ReporteService} from "@isc/api/reporte.service";
import {accion, FolioUtils} from "@isc/toolkit/folio-utils";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-registrar', templateUrl: './registrar.component.html', styleUrl: './registrar.component.scss'
})
export class RegistrarComponent implements OnInit {
  info: MensajeData | undefined;
  formReporte: FormGroup
  unidades: Unidad[] | undefined;
  areas: Reporte[] | undefined;
  reportes: Reporte[] | undefined;
  estados: Estado[] | undefined;
  deshabilitarFolio = true;
  visibleDialog: boolean;
  animacion: boolean;
  activarDetalles: boolean;

  constructor(private router: Router, private folioService: FolioService, private messageService: MessageService, private fb: FormBuilder, private unidadService: UnidadService, private estadoService: EstadoService, private reporteService: ReporteService) {
    console.log("RegistrarComponent")
    this.formReporte = this.fb.group({
      unidad: [null, Validators.required],
      area: [null, Validators.required],
      reporte: [null, Validators.required],
      agente: [null],
      estado: [null],
      detalles: [null],
      folio: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerUnidades();
    this.obtenerEstados();
    this.obtenerAreas();
    this.eventoAreaSeleccion()
  }

  generarFolio() {
    this.formReporte.patchValue({folio: FolioUtils.generarFolio()})
  }

  estadoFolioGenerador(nombre: string) {
    this.deshabilitarFolio = ['mesa de servicio', 'telmex', 'cfe'].includes(nombre.toLowerCase());
  }

  registrar() {
    this.animacion = true
    if (this.formReporte.invalid) {
      this.formReporte.markAllAsTouched()
      this.messageService.add({
        life: 8000, detail: 'Algunos campos son requeridos', summary: 'No se puede continuar', severity: 'warn'
      })
    } else {
      let data = FolioUtils.construirDataFolio(accion.Registrar, this.formReporte.value, null)
      this.folioService.registrar(data).subscribe({
        next: value => {
          if (value.code == 200) {
            this.info = {
              titulo: "Reporte registrado",
              tipo: "success",
              mensaje: `Registro exitoso. Folio de seguimiento: ${this.formReporte.get('folio').value}`,
              detalles: [`REPORTE | ${this.formReporte.get('area')?.value.area.nombre.toUpperCase()}`, `Unidad: ${this.formReporte.get('unidad').value.nombre}`, `Tipo de reporte: ${this.formReporte.get('reporte').value.nombre}`, `Folio: ${this.formReporte.get('folio').value}`,]
            }
            if (this.formReporte.get('estado').value) {
              this.info.detalles.push(`Estado: ${this.formReporte.get('estado').value.nombre}`)
            }
            if (this.formReporte.get('agente').value) {
              this.info.detalles.push(`Atiende: ${this.formReporte.get('agente').value}`)
            }
            this.formReporte.reset()
            this.visibleDialog = true
          }
        }, complete: () => {
          this.animacion = false
        }
        , error: (err: HttpErrorResponse) => {
          this.animacion = false
          console.log(err)
          if (err.status == HttpStatusCode.Conflict) {
            this.animacion = false
            this.formReporte.get('folio').setErrors({'invalido': true});
            this.info = {
              titulo: 'Registro duplicado',
              mensaje: `El folio ${this.formReporte.get('folio').value} ya se encuentra asignado a un reporte`,
              tipo: 'warn',
              detalles: ['Verifique la información y asegúrese de proporcionar un folio único para su reporte']
            }
            this.visibleDialog = true
          }
        }
      })
    }
  }

  async copyCode($event: MouseEvent) {
    let data = {...this.info.detalles}
    await navigator.clipboard.writeText(this.info.detalles.join('\n'));
    $event.preventDefault();
  }

  evtCancelar() {
    this.router.navigateByUrl('/folio')
  }

  evtDetalles() {
    this.activarDetalles = true
  }

  private obtenerUnidades() {
    this.unidadService.obtenerUnidades().subscribe({
      next: value => {
        this.unidades = value.data
      }
    })
  }

  private obtenerAreas() {
    this.reporteService.obtenerReportesPorArea().subscribe({
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

  private eventoAreaSeleccion() {
    this.formReporte.get('area')?.valueChanges.subscribe(value => {
      if (value) {
        this.reportes = value.reportes
        this.estadoFolioGenerador(value.area.nombre)
      } else {
        this.reportes = []
        this.formReporte.patchValue({'reporte': null})
        this.deshabilitarFolio = true
      }
    })
  }
}
