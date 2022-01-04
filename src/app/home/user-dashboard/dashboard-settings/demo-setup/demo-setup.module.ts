import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoSetupComponent } from './demo-setup.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '', component: DemoSetupComponent,
  }
];
@NgModule({
  declarations: [DemoSetupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DemoSetupModule { }
