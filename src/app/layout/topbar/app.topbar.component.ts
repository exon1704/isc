import {RouterLink} from "@angular/router";
import {Component, ElementRef, ViewChild} from "@angular/core";
import {NgClass} from "@angular/common";
import {MenuItem} from "primeng/api";
import {LayoutService} from "@isc/layout/app.layout.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [RouterLink, NgClass]
})
export class AppTopBarComponent {

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService) {
  }
}
