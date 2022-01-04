import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PayoutComponent } from "./payout.component";
import { AddBankComponent } from "./add-bank/add-bank.component";
import { MatDialogModule } from "@angular/material/dialog";
import {
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule
} from "@angular/material";
import { NumberOnlyDirectiveModule } from "../../../../modules/directive/directive.module";
import { BankListComponent } from "./bank-list/bank-list.component";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";
import { ConfirmationModule } from "../../../../modules/confirmation/confirmation.module";
const routes: Routes = [
  {
    path: "",
    component: PayoutComponent
  }
];
@NgModule({
  declarations: [
    PayoutComponent,
    AddBankComponent,
    BankListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NumberOnlyDirectiveModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    ConfirmationModule,
    ReactiveFormsModule,
    NumberOnlyDirectiveModule
  ],
  entryComponents: [AddBankComponent]
})
export class PayoutModule {}
