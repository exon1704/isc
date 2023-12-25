import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-title-module',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [NgClass]
})
export class Header {
  @Input() titulo = ''
  @Input() subtitulo = ''
  @Input() icon = '';
  @Input() color = 'bg-green-300';
}
