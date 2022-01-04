import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { ContactUsModule } from '../contact-us/contact-us.module';
import { LandingPage2Component } from './landing-page2.component';
const routes: Routes = [
  { path: '', component: LandingPage2Component }
];
@NgModule({
  declarations: [LandingPage2Component],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SafeHtmlModule,
    ContactUsModule
  ]
})
export class LandingPage2Module { }
