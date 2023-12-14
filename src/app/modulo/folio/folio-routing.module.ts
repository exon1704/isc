import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      loadChildren: () => import('./administrar/administrar.module').then(m => m.AdministrarModule)
    }
  ])],
  exports: [RouterModule]
})
export class FolioRoutingModule {
}
