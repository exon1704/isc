import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import * as fromComponents from "app/shared/components"
import {TitleModuleComponent} from "app/shared/components"
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  exports: [InputTextModule, FormsModule, ButtonModule, TitleModuleComponent, ReactiveFormsModule, HttpClientModule, CommonModule, ...fromComponents.components]
})
export class SharedModule {
}
