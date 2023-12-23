import {Component, ElementRef, inject} from '@angular/core';
import {LayoutService} from "@isc/layout/app.layout.service";

@Component({
  selector: 'app-sidebar', templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
  layoutService = inject(LayoutService)

  constructor(public el: ElementRef) {
  }
}

