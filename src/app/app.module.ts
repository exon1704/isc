import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {AppLayoutModule} from "@isc/layout/app.layout.module";
import {NotfoundComponent} from "@isc/modulo/notfound.component";
import {SpinnerComponent} from "@isc/core/spinner/spinner.component";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {LoaderInterceptor} from "@isc/core/spinner/loader.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, AppLayoutModule, NotfoundComponent, SpinnerComponent],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, {
    provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
  }],
  exports: [SpinnerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*En provides se agregan los servicios globales*/
