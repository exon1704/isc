import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of, tap} from "rxjs";
import {UrlBase} from "../url-base";
import {RestResponse} from "@isc/api/rest-response";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private readonly header: HttpHeaders;
  private reportes: RestResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  obtenerReportesPorArea() {
    return this.reportes ? of(this.reportes) : this.httpClient.get<RestResponse>(UrlBase.reportes, {headers: this.header})
      .pipe(tap(data => this.reportes = data));
  }
}
