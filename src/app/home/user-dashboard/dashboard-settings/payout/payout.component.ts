import { Component, OnInit, ViewChildren, ViewChild } from "@angular/core";
import { AddBankComponent } from "./add-bank/add-bank.component";
import { MatDialog } from "@angular/material";
import { BankListComponent } from "./bank-list/bank-list.component";

@Component({
  selector: "app-payout",
  templateUrl: "./payout.component.html",
  styleUrls: ["./payout.component.css"]
})
export class PayoutComponent implements OnInit {
  @ViewChild("bank") bankCom: BankListComponent;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      width: "700px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.bankCom.reloadBank();
      }
    });
  }
}
