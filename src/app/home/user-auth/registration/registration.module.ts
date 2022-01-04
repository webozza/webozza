import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckEmail } from './chek-email.directive';
const routes: Routes = [
  { path: '', component: RegistrationComponent }
];
@NgModule({
  declarations: [RegistrationComponent, CheckEmail],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ]
})
export class RegistrationModule { }
