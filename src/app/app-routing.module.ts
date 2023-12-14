import {NoPreloading, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {AppLayoutComponent} from "@isc/layout/app.layout.component";
import {NotfoundComponent} from "./notfound/notfound.component";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: '', component: AppLayoutComponent, children: [{
      path: 'dashboard', loadChildren: () => import("@isc/modulo/dashboard.module").then(value => value.DashboardModule)
    }, {
      path: 'folio', loadChildren: () => import("@isc/modulo/folio.module").then(value => value.FolioModule)
    }]
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
