import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { UserDashboardResolveService } from "../../../../home-servie/user-dashboard.service";
import { PaginateInfo, BankInfo } from "../../../../../globals/types";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationComponent } from "../../../../../modules/confirmation/confirmation.component";
import { Helpers } from "../../../../../helpers";
import { AddBankComponent } from "../add-bank/add-bank.component";

@Component({
  selector: "bank-list",
  templateUrl: "./bank-list.component.html",
  styleUrls: ["./bank-list.component.css"]
})
export class BankListComponent implements OnInit {
  page = 0;
  limit = 10;
  pageInfo: PaginateInfo;
  private perPage: number;
  data: BankInfo[] = [];
  filterData: BankInfo[] = [];
  columns = [];
  dataSource: any;
  constructor(
    private modal: MatDialog,
    private route: ActivatedRoute,
    private service: UserDashboardResolveService
  ) {
    this.columns = [
      "swift_code",
      "account_number",
      "routing_number",
      "min_settlement_amount_btc",
      // "min_settlement_amount_usd",
      "created",
      "action"
    ];
  }

  ngOnInit() {
    this.getBanks();
  }
  setData(data?) {
    this.pageInfo = {
      page: this.page,
      limit: this.limit,
      count: data ? data.length : this.data.length,
      perPage: this.perPage,
      pageCount: Math.round(
        (data ? data.length : this.data.length) / this.limit
      )
    };
    this.dataSource = new MatTableDataSource(
      this.generatePageData(data ? data : this.data)
    );
  }
  generatePageData(data: BankInfo[]) {
    const startIndex = this.page * this.limit;
    const cloneData: BankInfo[] = [];
    Object.assign(cloneData, data);
    return cloneData.splice(startIndex, this.limit);
  }
  paginate(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.setData(this.filterData.length ? this.filterData : null);
  }

  getBanks() {
    this.data = this.route.snapshot.data.banks;
    this.filterData = this.data;
    this.setData();
  }

  delete(id: String) {
    this.showDeleteConfirm()
      .afterClosed()
      .subscribe(res => {
        if (res) {
          Helpers.setLoading(true);
          this.service.deleteBank(id).then(resp => {
            if (resp.status === "OK") {
              Helpers.setLoading(false);
              this.reloadBank();
            }
          });
        }
      });
  }
  showDeleteConfirm() {
    return this.modal.open(ConfirmationComponent, {
      width: "50%",
      maxWidth: "500px",
      data: { title: "Are You sure You Want to Delete these bank? " }
    });
  }
  reloadBank() {
    Helpers.setLoading(false);
    this.service.getBanks().subscribe(res => {
      this.data = res;
      this.filterData = this.data;
      this.setData();
    });
  }

  editBank(id, bank) {
    const dialogRef = this.modal.open(AddBankComponent, {
      width: "700px",
      data: { editMode: true, bank_id: id, editData: bank }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.reloadBank();
      }
    });
  }
}
