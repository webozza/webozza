import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PayoutsPaymentComponent } from './payouts-payment.component';
import { DashboardReportsModule } from '../dashboard-reports.module';
const routes: Routes = [
  {
    path: '', component: PayoutsPaymentComponent,
  }
];
@NgModule({
  declarations: [PayoutsPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardReportsModule
  ]
})
export class PayoutsPaymentdModule { }
