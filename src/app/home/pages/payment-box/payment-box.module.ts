import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentBoxComponent } from './payment-box.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: PaymentBoxComponent }
];
@NgModule({
  declarations: [PaymentBoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentBoxModule { }
