import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrarComponent} from "@isc/modulo/administrar/administrar.component";
import {RegistrarComponent} from "@isc/modulo/administrar/registrar/registrar.component";

const routes: Routes = [{
  path: '', component: AdministrarComponent,
}, {
  path: 'registrar', component: RegistrarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)], exports: [RouterModule]
})
export class AdministrarRoutingModule {
}
