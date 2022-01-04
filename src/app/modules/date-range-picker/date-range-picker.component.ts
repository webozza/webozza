import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { NgxDrpOptions, PresetItem, Range } from "ngx-mat-daterange-picker";
@Component({
  selector: "date-range-picker",
  templateUrl: "./date-range-picker.component.html",
  styleUrls: ["./date-range-picker.component.css"]
})
export class DateRangePickerComponent implements OnInit, AfterViewInit {
  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];
  @ViewChild("dateRangePicker") dateRangePicker;
  @Input() placeholder: string;
  @Input() selected: { startDate: string; endDate: string };
  @ViewChild("datePicker") datePicker: ElementRef;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectDate = new EventEmitter();
  today = new Date();
  toMin = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  constructor() {}

  ngOnInit() {
    this.setupPresets();
    this.options = {
      placeholder: this.placeholder,
      presets: this.presets,
      format: "mediumDate",
      range:null, // set it to optional from src\app\modules\date-range-picker\date-range-picker.component.ts
      applyLabel: "Submit",
      calendarOverlayConfig: {
        shouldCloseOnBackdropClick: false
        // hasBackDrop: false
      }
    };
  }

  ngAfterViewInit() {
  }
  setupPresets() {
    const backDate = numOfDays => {
      // tslint:disable-next-line:no-shadowed-variable
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    };

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7);
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      {
        presetLabel: "Yesterday",
        range: { fromDate: yesterday, toDate: today }
      },
      {
        presetLabel: "Last 7 Days",
        range: { fromDate: minus7, toDate: today }
      },
      {
        presetLabel: "Last 30 Days",
        range: { fromDate: minus30, toDate: today }
      },
      {
        presetLabel: "This Month",
        range: { fromDate: currMonthStart, toDate: currMonthEnd }
      },
      {
        presetLabel: "Last Month",
        range: { fromDate: lastMonthStart, toDate: lastMonthEnd }
      }
    ];
  }
  updateRange(range: Range) {
    this.range = range;
    this.onSelectDate.emit({
      fromDate: this.getDate(this.range.fromDate),
      toDate: this.getDate(this.range.toDate)
    });
  }
  resetDate() {
   const resetRange = { fromDate: this.toMin, toDate: this.today };
    this.dateRangePicker.resetDates(resetRange);
  }

  getDate(date) {
    if (date) {
      const d = new Date(date);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    } else {
      return "";
    }
  }
}
