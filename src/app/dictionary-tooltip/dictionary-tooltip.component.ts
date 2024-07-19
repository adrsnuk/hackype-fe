import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-dictionary-tooltip',
    template: `
    <div class="tooltip" [ngStyle]="{ top: position?.top + 'px', left: position?.left + 'px' }">
      {{ data }}
    </div>
  `,
    styleUrls: ['./dictionary-tooltip.component.css']
})
export class DictionaryTooltipComponent {
    @Input() data: any;
    @Input() position: { left: number; top: number; } | undefined;
}
