import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReceivedPaymentComponent } from './received-payment.component';
import { DashboardReportsModule } from '../dashboard-reports.module';
const routes: Routes = [
  {
    path: '', component: ReceivedPaymentComponent,
  }
];
@NgModule({
  declarations: [ReceivedPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardReportsModule
  ]
})
export class ReceivedPaymentdModule { }
