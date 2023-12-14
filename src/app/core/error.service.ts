import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpStatusCode} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private messageService: MessageService) {
  }

  handleHttpError({status, url, message}: any): void {
    if (status == 0) {
      this.messageService.add({
        key: 'server',
        life: 10000,
        severity: 'error',
        summary: 'Error de conexión',
        detail: 'No se pudo conectar con el servidor'
      });
    } else if (status === HttpStatusCode.Conflict) {
      this.messageService.add({
        severity: 'error', summary: 'Registro duplicado', detail: message, life: 8000
      })
    } else {
      this.messageService.clear();
      this.messageService.add({life: 8000, severity: 'error', summary: 'Error', detail: message});
    }
  }
}
