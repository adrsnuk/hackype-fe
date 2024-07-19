import { Directive, ElementRef, HostListener, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { DictionaryTooltipComponent } from './dictionary-tooltip.component';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {
    @Input('appTooltip') tooltipData: any;

    private tooltipComponentRef: any;

    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.showTooltip();
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.hideTooltip();
    }

    private showTooltip() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(DictionaryTooltipComponent);
        this.tooltipComponentRef = this.viewContainerRef.createComponent(factory);
        this.tooltipComponentRef.instance.data = this.tooltipData;
        this.tooltipComponentRef.instance.position = this.calculatePosition();
    }

    private hideTooltip() {
        if (this.tooltipComponentRef) {
            this.tooltipComponentRef.destroy();
            this.tooltipComponentRef = null;
        }
    }

    private calculatePosition() {
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
    }
}
