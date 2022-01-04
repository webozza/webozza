import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordResetPasswordComponent } from './forgot-password-reset-password/forgot-password-reset-password.component';
import { MatIconModule } from '@angular/material';
import { PasswordStrengthBarModule } from '../../../modules/password-strength-bar/password-strength-bar.module';

const routes: Routes = [
  { path: '', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ForgotPasswordResetPasswordComponent}
];
@NgModule({
  declarations: [ForgetPasswordComponent, ForgotPasswordResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    PasswordStrengthBarModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgetPasswordModule { }
