import {Folio} from "@isc/api/folio";
import {Ticket} from "@isc/core/commons/ticket";

export enum accion {
   REGISTRAR = 'registrar', ACTUALIZAR = 'actualizar',
}

export class FolioUtils {
   static generarFolio() {
      const z = new Date();
      // Obtiene los componentes de fecha y hora
      const s = z.getSeconds();
      const h = z.getHours();
      const d = z.getDate();
      const m = z.getMonth() + 1;
      const a = z.getFullYear().toString().substring(2)
      const r = Math.floor(Math.random() * 100);
      // Concatena estos valores para formar un número
      return '' + a + m + d + h + r
   }

   static convertirFolioTicket(data: Folio): Ticket {
      return {
         folio: data.folio,
         reporte: data.reporte.nombre,
         nota: data.nota,
         unidad: data.unidad.clave + ' ' + data.unidad.nombre,
         area: data.reporte.area.nombre,
         atiende: data.agente == null ? '' : data.agente,
         estado: data.estado.nombre,
         fecha: data.fecha
      }
   }

   static construirDataFolio(tipo: accion, dataForm, folio: Folio) {
      let commonData = {
         agente: dataForm.agente,
         estado: dataForm.estado,
         folio: dataForm.folio,
         nota: dataForm.detalles,
         reporte: dataForm.reporte,
         unidad: dataForm.unidad,
         id: accion.ACTUALIZAR ? folio.id : 0
      };

   }
}
