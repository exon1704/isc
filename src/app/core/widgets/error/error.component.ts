import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ErrorService} from "./error.service";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  protected readonly location = location;

  constructor(protected errors: ErrorService) {
  }
}
