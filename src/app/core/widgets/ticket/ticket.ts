export interface Ticket {
   nota?: string;
   folio: string;
   reporte: string;
   data?: { title?: string; content?: string; style?: string | string[]; }[];
}