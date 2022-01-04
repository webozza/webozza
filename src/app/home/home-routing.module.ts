import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ContentResoveService } from "./home-servie/content-resolve.service";
import { UserGurd } from "../modules/auth/_gaurds/user.guard";
import { AuthGuard } from "../modules/auth/auth.guard";
import { WidgetResolveService } from "./home-servie/widget-resolve.service";
import { PageResolveService } from "./home-servie/page-resolve.service";
const routes: Routes = [
  {
    path: "",
    resolve: {
      content: ContentResoveService
    },
    component: HomeComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./pages/landing-page/landing-page.module#LandingPageModule"
      },
      {
        path: "widget",
        loadChildren: "./pages/widget/widget.module#WidgetModule"
        // resolve: { data: WidgetResolveService }
      },
      {
        path: "payment-box",
        loadChildren: "./pages/payment-box/payment-box.module#PaymentBoxModule"
      },
      {
        path: "new/payment",
        loadChildren:
          "./pages/paymout-create/paymout-create.module#PaymoutCreateModule"
      },

      {
        path: "faq",
        loadChildren: "./pages/faq/faq.module#FaqModule",
        resolve: { faqs: PageResolveService }
      },
      {
        path: "terms-and-conditions",
        loadChildren:
          "./pages/terms-conditions/terms-conditions.module#TermsConditionsModule"
      },
      // {
      //   path: "about",
      //   loadChildren: "./pages/about-us/about-us.module#AboutUsModule"
      // },
      // {
      //     path: 'dashboard',
      //     loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
      //     canLoad: [UserGurd]
      // },
      {
        path: "sign-in",
        loadChildren: "./user-auth/login/login.module#LoginModule"
      },
      {
        path: "forgot-password",
        loadChildren:
          "./user-auth/forget-password/forget-password.module#ForgetPasswordModule"
      },
      {
        path: "sign-up",
        loadChildren:
          "./user-auth/registration/registration.module#RegistrationModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
