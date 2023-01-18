import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverBlur]',
})
export class HoverBlurDirective {
  @Input('appHoverBlur') opacityPercentage = 0.6;

  @HostBinding('style.opacity') elementOpacity = 1;

  @HostListener('mouseenter') onMouseenter() {
    // this.elementRef.nativeElement.style.opacity = '0.6';
    this.elementOpacity = this.opacityPercentage;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.elementRef.nativeElement.style.opacity = '1';
    this.elementOpacity = 1;
  }

  constructor(private elementRef: ElementRef) {}
}
