import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password.component';
import { MatIconModule } from '@angular/material';
import { PasswordStrengthBarModule } from '../../../../modules/password-strength-bar/password-strength-bar.module';
const routes: Routes = [
    {
        path: '', component: PasswordComponent,
    }
];
@NgModule({
    declarations: [PasswordComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        PasswordStrengthBarModule,
        MatIconModule
    ]
    , exports: [PasswordStrengthBarModule]
})
export class PasswordModule { }
