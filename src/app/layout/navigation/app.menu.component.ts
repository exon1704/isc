import {Component, OnInit} from '@angular/core';
import {LayoutService} from "@isc/layout/app.layout.service";
import {AppMenu} from "@isc/core/app-menu";

@Component({
  selector: 'app-menu', templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = AppMenu;
  }
}
