import { Injectable, Pipe } from '@angular/core';
import { PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Pipe({
  name: 'safeSvg',
})
export class SafeSvgPipeService implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml  {
    

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
