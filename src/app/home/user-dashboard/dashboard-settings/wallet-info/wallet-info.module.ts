import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletInfoComponent } from './wallet-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '', component: WalletInfoComponent,
  }
];
@NgModule({
  declarations: [WalletInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class WalletInfoModule { }
