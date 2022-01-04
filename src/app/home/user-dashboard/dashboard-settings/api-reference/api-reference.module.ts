import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiReferenceComponent } from './api-reference.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: ApiReferenceComponent,
  }
];
@NgModule({
  declarations: [ApiReferenceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CommonModule]
})
export class ApiReferenceModule { }
