import { Component, OnInit } from "@angular/core";
import { paymentStatus, PAYOUT_STATUS } from "../../../../globals/function";
import { Location } from "@angular/common";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";
import { Payouts, Transactions } from "../../../../globals/types";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payments-details",
  templateUrl: "./payments-details.component.html",
  styleUrls: ["./payments-details.component.css"]
})
export class PaymentsDetailsComponent implements OnInit {
  payout: Payouts;
  loader: boolean;
  columns = [
    "Date",
    "Invoice No ",
    "Customer",
    "Amount(BTC)",
    "CPS Fee(BTC)",
    "Net Amount (BTC)",
  ];
  loaded: boolean;
  data: Transactions[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: UserDashboardResolveService,
    private location: Location
  ) {
    this.getPayoutDetails(this.route.snapshot.params.id);
  }

  ngOnInit() {}

  getStatus(id) {
    const obj = paymentStatus.find(item => Number(item.id) === Number(id));
    return obj;
  }

  getPayoutDetails(id) {
    this.loaded = false;
    this.loader = true;
    this.service.getPayoutDetails(id).subscribe(res => {
      this.payout = res;
      this.data = res.payout_items.map(item => {
        return item.payment;
      });
      this.loader = false;
      this.loaded = true;
    });
  }
  back() {
    this.location.back();
  }
  getPayoutStatus(status) {
    const obj = PAYOUT_STATUS.find(
      item => item.value.toLowerCase() === String(status).toLowerCase()
    );
    return obj;
  }
}
