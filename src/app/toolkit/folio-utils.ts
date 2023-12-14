import {Folio} from "@isc/api/Folio";

export enum accion {
  Registrar = 'registrar', Actualizar = 'actualizar',
}

export class FolioUtils {
  static generarFolio() {
    const z = new Date();
    // Obtiene los componentes de fecha y hora
    const s = z.getSeconds();
    const h = z.getHours();
    const d = z.getDate();
    const m = z.getMonth() + 1;
    const a = z.getFullYear();
    const r = Math.floor(Math.random() * 4);
    // Concatena estos valores para formar un número
    return 'F' + m + d + h + s + r
  }

  static construirDataFolio(tipo: accion, dataForm, folio: Folio) {
    let commonData = {
      agente: dataForm.agente,
      estado: dataForm.estado,
      folio: dataForm.folio,
      nota: dataForm.detalles,
      reporte: dataForm.reporte,
      unidad: dataForm.unidad
    };
    switch (tipo) {
      case accion.Registrar:
        return {
          ...commonData, id: 0
        }
      case accion.Actualizar:
        return {
          ...commonData, id: folio.id,
        }
      default:
        throw new Error('Tipo de reporte no reconocido')
    }

  }
}
