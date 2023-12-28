import {environment} from "@env/environment";

export class UrlBase {
  private static readonly baseUrl = `${environment.hostBackend}/nova/v1`;

  static readonly area = {
    areas: `${UrlBase.baseUrl}/area/areas`,
  };
  static readonly folio = {
    folio: `${UrlBase.baseUrl}/folio/folio`,
    detalles: `${UrlBase.baseUrl}/folio/detalles`,
    filtro: `${UrlBase.baseUrl}/folio/filtro`,
    guardar: `${UrlBase.baseUrl}/folio/guardar`,
  }
  static readonly estados = `${UrlBase.baseUrl}/estado/estados`
  static readonly reportes = `${UrlBase.baseUrl}/reporte/reporte-areas`
  static readonly unidad = {
    unidades: `${UrlBase.baseUrl}/unidad/unidades`,
    generales: `${UrlBase.baseUrl}/unidad/generales`
  }

}
