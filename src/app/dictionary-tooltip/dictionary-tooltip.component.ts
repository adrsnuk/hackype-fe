import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dictionary-tooltip',
  template: `
    <div class="tooltip whitespace-pre-line bg-gray-700 p-2 rounded" [ngStyle]="{ top: position?.top + 'px', left: position?.left + 'px' }">
      {{ data }}
    </div>
  `,
  styleUrls: ['./dictionary-tooltip.component.css']
})
export class DictionaryTooltipComponent {
  @Input() data: any;
  @Input() position: { left: number; top: number; } | undefined;
}
