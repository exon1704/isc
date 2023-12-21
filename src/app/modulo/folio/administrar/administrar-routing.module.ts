import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrarComponent} from "@isc/modulo/administrar.component";

const routes: Routes = [{
  path: '', component: AdministrarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarRoutingModule {
}
