import {Component, Input} from '@angular/core';
import {EditorModule} from "primeng/editor";
import {Ticket} from "@isc/core/ticket/ticket";
import {NgClass, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
   selector: 'app-ticket',
   standalone: true,
   imports: [EditorModule, NgStyle, FormsModule, NgClass],
   templateUrl: './ticket.component.html',
   styleUrl: './ticket.component.scss'
})
export class TicketComponent {
   @Input() ticket: Ticket

}
