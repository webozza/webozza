import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnableTestmodeComponent } from './enable-testmode.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '', component: EnableTestmodeComponent,
  }
];
@NgModule({
  declarations: [EnableTestmodeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class EnableTestmodeModule { }
