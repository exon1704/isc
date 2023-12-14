import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of, tap} from "rxjs";
import {UrlBase} from "@isc/api/url-base";
import {RestResponse} from "@isc/api/rest-response";

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private readonly header: HttpHeaders;
  private unidades: RestResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  obtenerUnidades() {
    return this.unidades ? of(this.unidades) : this.httpClient.get<RestResponse>(UrlBase.unidad.unidades, {headers: this.header})
      .pipe(tap(data => this.unidades = data));
  }

}
