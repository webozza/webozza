import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
const routes: Routes = [
  { path: '', component: TermsConditionsComponent }
];
@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SafeHtmlModule
  ]
})
export class TermsConditionsModule { }
