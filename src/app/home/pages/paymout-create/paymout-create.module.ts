import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymoutCreateComponent } from './paymout-create.component';
import { PreloaderModule } from '../../../modules/preloader/preloader.module';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', component: PaymoutCreateComponent }
];
@NgModule({
  declarations: [PaymoutCreateComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    SafeHtmlModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymoutCreateModule { }
