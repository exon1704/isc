import {Component, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [ProgressSpinnerModule, AsyncPipe]
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {
  }
}
