export interface Folio {
  id?: number;
  reporte?: {
    id?: number;
    nombre?: string;
    area?: {
      id?: number;
      nombre?: string
    }
  };
  estado?: {
    id?: number;
    nombre?: string
  };
  fecha?: string;
  folio?: string;
  unidad?: {
    id?: number;
    nombre?: string;
    clave?: string
  }
}
