import { Component, OnInit } from "@angular/core";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";
import { Payouts, PaginateInfo } from "../../../../globals/types";
import { PAYOUT_STATUS } from "../../../../globals/function";
import { map } from "rxjs/operators";

@Component({
  selector: "app-payments-list",
  templateUrl: "./payments-list.component.html",
  styleUrls: ["./payments-list.component.css"]
})
export class PaymentsListComponent implements OnInit {
  data: Payouts[] = [];
  page = 0;
  limit = 10;
  pageInfo: PaginateInfo;
  filterData: Payouts[] = [];
  searchQuery = "";
  pageQuery: any;
  loaded: boolean;
  constructor(private service: UserDashboardResolveService) {
    this.reloadPayouts();
  }

  ngOnInit() {}

  get payments() {
    return [
      {
        transaction_id: " dev",
        confirmations: "5",
        total_amount_btc: "0.003",
        status: "completed"
      }
    ];
  }

  getPayoutStatus(status) {
    const obj = PAYOUT_STATUS.find(
      item => item.value.toLowerCase() === String(status).toLowerCase()
    );
    return obj;
  }
  searchPayoutList(query) {
    if (query) {
      this.searchQuery = query;
      this.reloadPayouts();
    }
  }


  downloadReport(id) {
    this.service.downloadPayoutReport(id).then(res => {
   //   console.log(res);
      const url = window.URL.createObjectURL(res);
    window.open(url);
    });
  }

  resetFilter() {
    this.searchQuery = "";
    this.reloadPayouts();
  }
  paginate(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.pageQuery = `?page=${this.page}&limit=${this.limit}`;
    this.reloadPayouts();
  }
  reloadPayouts(filter?) {
    this.loaded = false;
    let query = "";
    if (this.searchQuery && !this.pageQuery) {
      query = `?${this.searchQuery}`;
    }
    if (this.pageQuery && this.searchQuery) {
      query = `${this.pageQuery}&${this.searchQuery}`;
    } else if (this.pageQuery) {
      query = `?page=${this.page}&limit=${this.limit}`;
    }
    // console.log(query)
    this.service
      .getPayoutList(query)
      .pipe(
        map(res => {
          return res;
        })
      )
      .subscribe(
        res => {
          this.loaded = true;
          this.data = res.data ? res.data : [];
          this.filterData = res.data ? res.data : [];
          this.pageInfo = res.pagination;
        },
        err => {
          this.data = [];
        }
      );
  }
}
