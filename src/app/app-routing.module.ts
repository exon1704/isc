import {NoPreloading, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {AppLayoutComponent} from "@isc/layout/app.layout.component";
import {NotfoundComponent} from "./notfound/notfound.component";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: '', component: AppLayoutComponent, children: [
      {path: 'folio', loadChildren: () => import("@isc/modulo/administrar.module").then(m => m.AdministrarModule)},
      {path: 'registrar', loadChildren: () => import("@isc/modulo/registro.module").then(m => m.RegistroModule)}
    ]
  }, {path: 'notfound', component: NotfoundComponent}, {
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
