import {Unidad} from "@isc/api/unidad";

export interface Generales {
  unidad: Unidad,
  info: {
    contacto: {
      id: number,
      telefono: string,
      direccion: string
    },
    horarios: []
  }
}
