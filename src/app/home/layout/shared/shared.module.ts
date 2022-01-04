import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { HomeRoutingModule } from '../../home-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SharedComponent, HeaderComponent,  FooterComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
