import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { RouterModule, Routes } from '@angular/router';
import { SafeHtmlModule } from '../../../modules/safe-html/safe-html.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'angular-google-recaptcha';
@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot({
      siteKey: '6LcyAbUUAAAAAIo4XpVBtDX8K4c2HHyJsL91pFQt',
    }),
  ],
  exports: [ContactUsComponent]
})
export class ContactUsModule { }
