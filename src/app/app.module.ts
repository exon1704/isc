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
import {SpinnerComponent} from "@isc/core/shared/components/spinner/spinner.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptor} from "@isc/core/shared/interceptor/loader.interceptor";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [AppComponent, NotfoundComponent, SpinnerComponent],
  imports: [SharedModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, AppLayoutModule, ProgressSpinnerModule],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, MessageService, {
    provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
  }],
  exports: [SpinnerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*En provides se agregan los servicios globales*/
