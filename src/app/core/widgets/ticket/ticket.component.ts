import {Component, Input} from '@angular/core';
import {TicketData} from "./ticket.data";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";

@Component({
   selector: 'app-ticket',
   standalone: true,
   imports: [EditorModule, FormsModule],
   templateUrl: './ticket.component.html',
   styleUrl: './ticket.component.scss'
})
export class TicketComponent {
   @Input() folio: TicketData


}
