import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-core-menu-horizontal-item',
  templateUrl: './item.component.html'
})
export class CoreMenuHorizontalItemComponent {
  @Input()
  item: any;
}
