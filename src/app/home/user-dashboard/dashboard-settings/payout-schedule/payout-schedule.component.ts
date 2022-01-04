import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl } from "@angular/forms";
import { AlertService } from "../../../../modules/alert/alert.service";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";
import { transaction_frequencies } from "../../../../globals/function";
@Component({
  selector: "payout-schedule",
  templateUrl: "./payout-schedule.component.html",
  styleUrls: ["./payout-schedule.component.css"]
})
export class PayoutScheduleComponent implements OnInit {
  loading: boolean;
  submitting: boolean;
  isManual = false;
  minimum_amount = new FormControl("");
  @ViewChild("hasAlert") alertContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private service: UserDashboardResolveService
  ) {
    this.getShedule();
  }

  ngOnInit() {}

  submit(type) {
    let promise: Promise<any>;

    this.loading = true;
    promise = this.service.saveSchedule({
      isManual: this.isManual ? 1 : 0,
      min_amount: this.minimum_amount.value
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
  SelectScheduleType(e) {
    if (e === "manual") {
      this.isManual = true;
    } else {
      this.isManual = false;
    }
  }

  getShedule() {
    this.service.getSchedule().subscribe(res => {
      this.isManual = res.isManual;
      this.minimum_amount.setValue(res.min_amount ? res.min_amount : 0);
    });
  }
}
