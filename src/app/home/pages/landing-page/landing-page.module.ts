import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { ContactUsModule } from '../contact-us/contact-us.module';
const routes: Routes = [
  { path: '', component: LandingPageComponent }
];
@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SafeHtmlModule,
    ContactUsModule
  ]
})
export class LandingPageModule { }
