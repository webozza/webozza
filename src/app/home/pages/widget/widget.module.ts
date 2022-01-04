import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { PreloaderModule } from '../../../modules/preloader/preloader.module';
const routes: Routes = [
  { path: '', component: WidgetComponent }
];
@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SafeHtmlModule,
    PreloaderModule
  ]
})
export class WidgetModule { }
