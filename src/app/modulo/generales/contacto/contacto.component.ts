import {Component, Input, OnDestroy} from '@angular/core';
import {Generales} from "@isc/api/generales";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent implements OnDestroy {
  @Input() generales: Generales

  ngOnDestroy(): void {

  }

}
