import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDashboardComponent } from './my-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'
import * as HighchartsMore from 'highcharts/highcharts-more.src'
import * as HighchartsSolidGauge from 'highcharts/modules/solid-gauge'

const routes: Routes = [
  {
    path: '', component: MyDashboardComponent,
  }
];
@NgModule({
  declarations: [MyDashboardComponent],
  imports: [
    CommonModule,
    ChartModule,
    RouterModule.forChild(routes),
    SafeHtmlModule
  ],
  providers: [
    HttpService,
    { 
      provide: HIGHCHARTS_MODULES, 
      useFactory: () => [HighchartsMore, HighchartsSolidGauge] 
  },
  ]
})
export class MyDashboardModule { }
