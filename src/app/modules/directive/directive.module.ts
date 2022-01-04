import { NgModule } from '@angular/core';
import { NumberOnlyDirective } from './numberOnly.directive';



@NgModule({
  exports: [NumberOnlyDirective],
  declarations: [NumberOnlyDirective]
})
export class NumberOnlyDirectiveModule { }
