import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent implements OnInit, OnDestroy {
  @Input() generales

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

}
