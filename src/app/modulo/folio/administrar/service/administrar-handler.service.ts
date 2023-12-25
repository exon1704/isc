import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpHandlerError} from "@isc/core/widgets/error/http-handler-error";
import {ErrorService} from "@isc/core/widgets/error/error.service";

@Injectable({
  providedIn: 'root'
})
export class AdministrarHandlerService implements HttpHandlerError {
  constructor(private errorService: ErrorService) {
  }

  httpHandlerServiceError(error: HttpErrorResponse, serviceName: string, viewError: boolean): void {
    if (error.status == 0) {
      this.errorService.setError(serviceName, `${serviceName} : No se puede conectar con el servidor. ${error.name}`, viewError)
    }
  }
}
