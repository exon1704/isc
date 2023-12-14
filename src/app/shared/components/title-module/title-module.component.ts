import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-title-module',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-module.component.scss']
})
export class TitleModuleComponent {
  @Input() title = ''
  @Input() description = ''
  @Input() icon = '';
  @Input() color = 'bg-green-300';
}
