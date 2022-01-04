import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardPaymentsComponent } from "./dashboard-payments.component";
import { PaymentsDetailsComponent } from "./payments-details/payments-details.component";
import { PaymentsListComponent } from "./payments-list/payments-list.component";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardResolveService } from "../../home-servie/user-dashboard.service";
import { PaymentsFilterComponent } from "./payments-filter/payments-filter.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DateRangeModule } from "../../../modules/date-range-picker/date-range-picker.module";
import { MatPaginatorModule, MatSelectModule, MatFormFieldModule } from "@angular/material";
const routes: Routes = [
  {
    path: "",
    component: DashboardPaymentsComponent,
    children: [
      {
        path: "",
        component: PaymentsListComponent
      },
      { path: "details/:id", component: PaymentsDetailsComponent }
    ]
  }
];
@NgModule({
  declarations: [
    DashboardPaymentsComponent,
    PaymentsDetailsComponent,
    PaymentsListComponent,
    PaymentsFilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DateRangeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class DashboardPaymentsModule {}
