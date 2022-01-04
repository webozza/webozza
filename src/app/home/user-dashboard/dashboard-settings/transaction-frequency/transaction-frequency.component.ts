import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { transaction_frequencies } from "../../../../globals/function";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";
import { AlertService } from "../../../../modules/alert/alert.service";

@Component({
  selector: "app-transaction-frequency",
  templateUrl: "./transaction-frequency.component.html",
  styleUrls: ["./transaction-frequency.component.css"]
})
export class TransactionFrequencyComponent implements OnInit {
  loading: boolean;
  submitting: boolean;
  transaction_frequency;
  allFrequencies = transaction_frequencies;
  @ViewChild("hasAlert") alertContainer: ElementRef;
  constructor(
    private alert: AlertService,
    private service: UserDashboardResolveService
  ) {
    this.getTransactionFrequency();
  }

  ngOnInit() {}
  getTransactionFrequency() {
    let frequency = "";
    this.service.getTransactionFrequency().subscribe(res => {
      frequency = res && res.frequency ? res.frequency : "";
      this.transaction_frequency = frequency;
      this.allFrequencies.map(item => {
        item.selected = false;
        if (item.value === frequency) {
          item.selected = true;
        }
      });
    });
  }
  setFrequency(e) {
    this.transaction_frequency = String(e).toLowerCase();
  }
  submit() {
    let promise: Promise<any>;
    if (!this.transaction_frequency) {
      this.alert.error(
        this.alertContainer,
        "Select Transaction Frequecy",
        true,
        5000
      );
      return;
    }
    this.submitting = true;
    promise = this.service.saveFrequency({
      transaction_report_frequency: this.transaction_frequency
    });
    promise
      .then(res => {
        this.loading = false;
        this.submitting = false;
        if (res.status === "OK") {
          this.alert.success(
            this.alertContainer,
            res.result.message,
            true,
            4000
          );
          setTimeout(() => {}, 5000);
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 5000);
        }
      })
      .catch(error => {
        this.alert.error(
          this.alertContainer,
          "Something wrong please try again",
          true,
          5000
        );
        this.loading = false;
        this.submitting = false;
      });
  }
}
