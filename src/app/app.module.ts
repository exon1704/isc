import {NgModule} from '@angular/core';
import {CoreModule} from "@isc/core/core.module";
import {DatePipe, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {AppLayoutModule} from "@isc/layout/app.layout.module";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [CoreModule, AppRoutingModule, AppLayoutModule],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, MessageService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*En provides se agregan los servicios globales*/
