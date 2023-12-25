import {HttpErrorResponse} from "@angular/common/http";

export interface HttpHandlerError {
  httpHandlerServiceError(error: HttpErrorResponse, serviceName: string, viewError: boolean): void
}
