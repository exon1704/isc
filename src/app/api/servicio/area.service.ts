import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of, tap} from "rxjs";
import {RestResponse} from "@isc/api/rest-response";
import {UrlBase} from "@isc/api/url-base";

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly header: HttpHeaders;
  private areas: RestResponse;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/json'});
  }

  obtenerAreas() {
    return this.areas ? of(this.areas) : this.httpClient.get<RestResponse>(UrlBase.area.areas, {headers: this.header})
      .pipe(tap(data => this.areas = data));
  }
}
