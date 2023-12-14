import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import * as fromComponents from "app/shared/components"
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [...fromComponents.components],
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, ButtonModule, InputTextModule,
    RippleModule, ToastModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, ButtonModule, InputTextModule,
    ...fromComponents.components]
})
export class SharedModule {
}
