import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AppMenuComponent} from "@isc/layout/app.menu.component";
import {AppMenuitemComponent} from "@isc/layout/app.menuitem.component";
import {AppTopBarComponent} from "@isc/layout/app.topbar.component";
import {AppSidebarComponent} from "@isc/layout/app.sidebar.component";
import {AppLayoutComponent} from "@isc/layout/app.layout.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AppMenuitemComponent, AppTopBarComponent, AppMenuComponent, AppSidebarComponent, AppLayoutComponent],
  imports: [RouterModule, CommonModule],
  exports: [AppLayoutComponent, AppTopBarComponent]
})
export class AppLayoutModule {
}
