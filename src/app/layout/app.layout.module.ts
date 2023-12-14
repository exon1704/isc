import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";
import {AppMenuComponent} from "@isc/layout/app.menu.component";
import {AppMenuitemComponent} from "@isc/layout/app.menuitem.component";
import {AppTopBarComponent} from "@isc/layout/app.topbar.component";
import {AppSidebarComponent} from "@isc/layout/app.sidebar.component";
import {AppLayoutComponent} from "@isc/layout/app.layout.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
