import {Routes} from "@angular/router";

export const TicketRouter: Routes = [{
   path: '',
   loadComponent: () => import("@isc/modulo/administrar-ticket/administrar-ticket.component").then(c => c.AdministrarTicketComponent)
}, {
   path: 'registrar',
   loadComponent: () => import("@isc/modulo/registrar-ticket/registrar-ticket.component").then(c => c.RegistrarTicketComponent)
}, {
   path: 'editar/:folio',
   loadComponent: () => import("@isc/modulo/editar-ticket/editar-ticket.component").then(c => c.EditarTicketComponent)
}];