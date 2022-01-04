import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
  ],
  exports: [SafeHtmlPipe]
})
export class SafeHtmlModule { }
