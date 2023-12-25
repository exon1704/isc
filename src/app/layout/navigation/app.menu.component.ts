import {Component, OnInit} from '@angular/core';
import {AppMenuitemComponent} from "@isc/layout/app.menuitem.component";
import {NgFor, NgIf} from "@angular/common";
import {LayoutService} from "@isc/layout/app.layout.service";
import {AppMenu} from "@isc/core/app-menu";

@Component({
  selector: 'app-menu', templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = AppMenu;
  }
}
