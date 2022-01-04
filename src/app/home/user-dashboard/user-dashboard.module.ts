import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { DashboardHeaderComponent } from './layouts/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './layouts/dashboard-sidebar/dashboard-sidebar.component';
import { SupportComponent } from './support/support.component';
import { AccountUsersComponent } from './account/account-users/account-users.component';
import { InvoicesComponent } from './account/invoices/invoices.component';
import { PaymentsComponent } from './account/payments/payments.component';
import { AccountsInvoicesComponent } from './account/accounts-invoices/accounts-invoices.component';
import { ManageProfileComponent } from './profile/manage-profile/manage-profile.component';
import { ManageProfileAccountComponent } from './profile/manage-profile-account/manage-profile-account.component';
import { ManageAccountComponent } from './account/manage-account/manage-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthBarModule } from '../../modules/password-strength-bar/password-strength-bar.module';
import { MatIconModule } from '@angular/material';
import { CreateProfileAccountComponent } from './profile/manage-profile-account/create-profile-account/create-profile-account.component';
import { SafeHtmlModule } from '../../modules/safe-html/safe-html.pipe';
import { DateToLocalPipe } from '../../modules/date-to-local.pipe';
import { BasicIntegrationComponent } from "./integration/basic-integration/basic-integration.component";
import { WordpressBasicComponent } from './integration/wordpress-basic/wordpress-basic.component';
import { WordpressWoocommerceComponent } from './integration/wordpress-woocommerce/wordpress-woocommerce.component';

@NgModule({
    declarations: [DateToLocalPipe, UserDashboardComponent,ManageProfileComponent, DashboardHeaderComponent, DashboardSidebarComponent, SupportComponent, AccountUsersComponent, InvoicesComponent, PaymentsComponent, AccountsInvoicesComponent, ManageAccountComponent, ManageProfileAccountComponent, CreateProfileAccountComponent, BasicIntegrationComponent, WordpressBasicComponent, WordpressWoocommerceComponent,],
    imports: [
        CommonModule,
        UserDashboardRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        PasswordStrengthBarModule,
        SafeHtmlModule
    ]
    , exports: [DashboardHeaderComponent, DashboardSidebarComponent],
    providers: [DateToLocalPipe]
})
export class UserDashboardModule { }
