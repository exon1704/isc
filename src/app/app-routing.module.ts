import {NgModule} from "@angular/core";
import {NoPreloading, RouterModule} from "@angular/router";
import {AppLayoutComponent} from "@isc/layout/app.layout.component";

@NgModule({
   imports: [RouterModule.forRoot([{
      path: '', component: AppLayoutComponent, children: [{
         path: 'ticket', loadChildren: () => import("@isc/modulo/ticket/ticket.router").then(r => r.TicketRouter)
      },]
   }, {
      path: 'notfound',
      loadComponent: () => import("@isc/modulo/notfound/notfound.component").then(c => c.NotfoundComponent)
   }, {
      path: '**', redirectTo: '/notfound'
   },], {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      preloadingStrategy: NoPreloading
   })], exports: [RouterModule]
})
export class AppRoutingModule {
}
