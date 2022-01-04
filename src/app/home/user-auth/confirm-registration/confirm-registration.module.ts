import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmRegistrationComponent } from './confirm-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { FinishComponent } from './finish/finish.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { NumberOnlyDirectiveModule } from '../../../modules/directive/directive.module';
const routes: Routes = [
  { path: '', component: ConfirmRegistrationComponent }
];
@NgModule({
  declarations: [ConfirmRegistrationComponent, TermsConditionComponent, CompleteRegistrationComponent, FinishComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SafeHtmlModule,
    NumberOnlyDirectiveModule
  ]
})
export class ConfirmRegistrationModule { }
