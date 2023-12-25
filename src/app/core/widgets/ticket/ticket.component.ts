import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TicketData} from "./ticket.data";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {
  @Input() folio: TicketData
}
