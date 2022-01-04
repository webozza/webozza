import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './modules/alert/alert.module';
import { HttpWithInjectorModule } from './modules/http-with-injector/http-with-injector.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import * as $ from 'jquery';
import { MetaService } from './_services/meta.service';
import { CookieModule } from 'ngx-cookie';
//  import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutCreateInvoiceComponent } from './checkout-create-invoice/checkout-create-invoice.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatCardModule } from '@angular/material';
import { AuthService } from './modules/auth/auth.service';
import { UserGurd } from './modules/auth/_gaurds/user.guard';
import { ValidateEmailComponent } from './validate-email/validate-email.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutCreateInvoiceComponent,
    CheckoutComponent,
    ValidateEmailComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    HttpWithInjectorModule.forRoot({ endPoint: '', }),
    AlertModule.forRoot({ main: 'something' }),
     BrowserAnimationsModule,
     NgbModule,
     MatCardModule,
     
    //  ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ScriptLoaderService, MetaService, AuthService, UserGurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
