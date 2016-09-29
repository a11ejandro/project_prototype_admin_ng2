import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { ConfigService } from '../config.service';

@Directive({ selector: '[hostSrc]' })

export class HostSrcDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private config: ConfigService) { }

  @Input() set hostSrc(relativeSrc: string) {
    // Don't modify passed data urls.
    if(relativeSrc.split('/')[0] == 'data:image') {
      this.renderer.setElementAttribute(this.el.nativeElement, 'src', relativeSrc);
    } else {
      let resultSrc: string = this.config.getApiHost() + relativeSrc;
      this.renderer.setElementAttribute(this.el.nativeElement, 'src', resultSrc);
    }
  };
}
