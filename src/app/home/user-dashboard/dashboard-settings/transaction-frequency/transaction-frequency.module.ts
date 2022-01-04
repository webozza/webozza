import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NumberOnlyDirectiveModule } from "../../../../modules/directive/directive.module";
import { TransactionFrequencyComponent } from "./transaction-frequency.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionFrequencyComponent
  }
];
@NgModule({
  declarations: [TransactionFrequencyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumberOnlyDirectiveModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: []
})
export class TransactionFrequencyModule {}
