import {
  Directive,
  OnInit,
  ElementRef,
  Renderer2,
  HostListener,
  Input
} from "@angular/core";

@Directive({ selector: '[appPeekABoo]' })
export class PeekABooDirective implements OnInit {

  @Input() defaultColor: string = 'red';

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) {

  }

  // implement OnInit's `ngOnInit` method
  ngOnInit() {
    console.log('ngOn init called in peek a boo directive');
    this.setBgColor(this.defaultColor);
  }

  public setBgColor(color: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBgColor('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor(this.defaultColor);
  }

}