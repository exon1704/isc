import {NgModule} from '@angular/core';
import {AdministrarRoutingModule} from "@isc/modulo/administrar/administrar-routing.module";
import {AdministrarComponent} from "@isc/modulo/administrar/administrar.component";
import {RegistrarComponent} from "@isc/modulo/administrar/registrar/registrar.component";
import {SharedModule} from "@isc/shared/shared.module";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {DividerModule} from "primeng/divider";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputGroupModule} from "primeng/inputgroup";
import {EditorModule} from "primeng/editor";
import {DialogModule} from "primeng/dialog";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {KeyFilterModule} from "primeng/keyfilter";
import {CheckboxModule} from "primeng/checkbox";
import {FieldsetModule} from "primeng/fieldset";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [AdministrarComponent, RegistrarComponent],
  imports: [SharedModule, AdministrarRoutingModule, ToolbarModule, DropdownModule, DividerModule, TableModule, CalendarModule, InputGroupModule, EditorModule, DialogModule, MessageModule, ToastModule, TooltipModule, KeyFilterModule, CheckboxModule, FieldsetModule, ProgressSpinnerModule]
})
export class AdministrarModule {
}
