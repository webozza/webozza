import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-payments-filter",
  templateUrl: "./payments-filter.component.html",
  styleUrls: ["./payments-filter.component.css"]
})
export class PaymentsFilterComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onReset = new EventEmitter();
  form: FormGroup;
  merchants = [];
  constructor(
    private fb: FormBuilder) {
    this.form = this.fb.group({
      status: [""],
      startDate: [""],
      endDate: [""]
    });
  }

  ngOnInit() {}
  submit() {
    let query = "";
    const obj = this.form.getRawValue();
    // tslint:disable-next-line:forin
    for (const c in obj) {
      query += `${c}=${obj[c] ? obj[c] : ""}&`;
    }
    if (query) {
      this.onSearch.emit(query);
    }
  }

  reset() {
    this.form.reset();
    this.onReset.emit("");
  }

  SelectDateRange(e) {
    const startDate = e.fromDate ? e.fromDate : "";
    const endDate = e.toDate ? e.toDate : "";
    console.log(startDate, endDate);
    this.form.get("startDate").setValue(startDate);
    this.form.get("endDate").setValue(endDate);
  }
}
