import {Component, ElementRef, inject} from '@angular/core';
import {AppMenuComponent} from "@isc/layout/app.menu.component";
import {LayoutService} from "@isc/layout/app.layout.service";

@Component({
  selector: 'app-sidebar', templateUrl: './app.sidebar.component.html',
  standalone: true,
  imports: [AppMenuComponent]
})
export class AppSidebarComponent {
  layoutService = inject(LayoutService)

  constructor(public el: ElementRef) {
  }
}

