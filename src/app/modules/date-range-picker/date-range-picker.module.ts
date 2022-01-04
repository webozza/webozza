import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateRangePickerComponent } from "./date-range-picker.component";
import { FormsModule } from "@angular/forms";
import { NgxMatDrpModule } from 'ngx-mat-daterange-picker';
import { MatInputModule } from "@angular/material";
@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxMatDrpModule,
    MatInputModule
  ],
  exports: [
    DateRangePickerComponent,
    FormsModule,
    MatInputModule,
    NgxMatDrpModule
  ]
})
export class DateRangeModule {}
