import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {AppLayoutModule} from "@isc/layout/app.layout.module";
import {SharedModule} from "@isc/shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [SharedModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, AppLayoutModule],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*En provides se agregan los servicios globales*/
