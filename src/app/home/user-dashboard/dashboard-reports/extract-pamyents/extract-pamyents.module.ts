import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractPamyentsComponent } from './extract-pamyents.component';
import { DashboardReportsModule } from '../dashboard-reports.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ExtractPamyentsComponent,
  }
];
@NgModule({
  declarations: [ExtractPamyentsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardReportsModule
  ]
})
export class ExtractPamyentsModule { }
