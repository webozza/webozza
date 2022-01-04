import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./modules/auth/_gaurds/admin.guard";
import { UserGurd } from "./modules/auth/_gaurds/user.guard";
import { CheckoutResolveService } from "./home/home-servie/checkout-resolve.service";
import { AdminGuardService } from "./modules/auth/_gaurds/admin-gurd.service";
import { CheckoutCreateInvoiceComponent } from "./checkout-create-invoice/checkout-create-invoice.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ValidateEmailComponent } from "./validate-email/validate-email.component";
const routes: Routes = [
  {
    path: "", // home 1 layout => home
    loadChildren: "app/home/home.module#HomeModule"
  },
  {
    path: "dashboard", // user dashboard
    loadChildren:
      "app/home/user-dashboard/user-dashboard.module#UserDashboardModule",
    canLoad: [UserGurd]
  },
  {
    path: "checkout/:id/:guid",
    component: CheckoutComponent
  },
  {
    path: "checkout",
    component: CheckoutCreateInvoiceComponent
  },
  {
    path: "validate-email",
    component: ValidateEmailComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
