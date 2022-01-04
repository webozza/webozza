import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardComponent } from "./user-dashboard.component";
import { UserDashboardResolveService } from "../home-servie/user-dashboard.service";
import { SupportComponent } from "./support/support.component";
import { ManageProfileComponent } from "./profile/manage-profile/manage-profile.component";
import { ManageAccountComponent } from "./account/manage-account/manage-account.component";
import { AccountsInvoicesComponent } from "./account/accounts-invoices/accounts-invoices.component";
import { PaymentsComponent } from "./account/payments/payments.component";
import { InvoicesComponent } from "./account/invoices/invoices.component";
import { AccountUsersComponent } from "./account/account-users/account-users.component";
import { ManageProfileAccountComponent } from "./profile/manage-profile-account/manage-profile-account.component";
import { CreateProfileAccountComponent } from "./profile/manage-profile-account/create-profile-account/create-profile-account.component";
import { BasicIntegrationComponent } from "./integration/basic-integration/basic-integration.component";
import { WordpressWoocommerceComponent } from "./integration/wordpress-woocommerce/wordpress-woocommerce.component";
import { WordpressBasicComponent } from "./integration/wordpress-basic/wordpress-basic.component";

const routes: Routes = [
  {
    path: "",
    component: UserDashboardComponent,
    children: [
      {
        path: "",
        loadChildren: "./my-dashboard/my-dashboard.module#MyDashboardModule",
        resolve: { balance: UserDashboardResolveService }
      },
      {
        path: "profile",
        component: ManageProfileComponent
      },
      {
        path: "profile/account",
        component: ManageProfileAccountComponent
      },
      {
        path: "profile/account/create",
        component: CreateProfileAccountComponent
      },
      {
        path: "account/profile",
        component: ManageAccountComponent
      },
      {
        path: "account/users",
        component: AccountUsersComponent
      },
      {
        path: "account/invoices",
        component: InvoicesComponent
      },
      {
        path: "account/payments",
        component: PaymentsComponent
      },
      {
        path: "account/account-invoices",
        component: AccountsInvoicesComponent
      },

      {
        path: "support",
        component: SupportComponent
      },

      {
        path: "integration/basic",
        component: BasicIntegrationComponent
      },

      {
        path: "integration/wordpress-basic",
        component: WordpressBasicComponent
      },

      {
        path: "integration/wordpress-woocommerce",
        component: WordpressWoocommerceComponent
      },

      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserDashboardRoutingModule {}
