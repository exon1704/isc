import {NgModule} from '@angular/core';
import {RegistroRoutingModule} from './registro-routing.module';
import {RegistroComponent} from './registro.component';
import {DropdownModule} from "primeng/dropdown";
import {InputGroupModule} from "primeng/inputgroup";
import {EditorModule} from "primeng/editor";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";
import {SharedModule} from "@isc/shared/shared.module";
import {TicketComponent} from "@isc/core/shared/components/ticket/ticket.component";
import {ErrorComponent} from "@isc/core/shared/components/error/error.component";

@NgModule({
  declarations: [RegistroComponent],
  imports: [RegistroRoutingModule, SharedModule, DialogModule, DropdownModule, EditorModule, InputGroupModule, TooltipModule, TicketComponent, ErrorComponent]
})
export class RegistroModule {
}
