import {Component, Input} from '@angular/core';
import {EditorModule} from "primeng/editor";
import {NgClass, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Ticket} from "@isc/core/commons/ticket";

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
