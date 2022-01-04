import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { Routes, RouterModule } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
const routes: Routes = [
  { path: '', component: AboutUsComponent }
];
@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SafeHtmlModule
  ]
})
export class AboutUsModule { }
