import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { PayoutScheduleComponent } from "./payout-schedule.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NumberOnlyDirectiveModule } from "../../../../modules/directive/directive.module";

const routes: Routes = [
  {
    path: "",
    component: PayoutScheduleComponent
  }
];
@NgModule({
  declarations: [PayoutScheduleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumberOnlyDirectiveModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: []
})
export class PayoutScheduleModule {}
