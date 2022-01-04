import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserDashboardResolveService } from '../../../home-servie/user-dashboard.service';

@Component({
  selector: 'reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css']
})
export class ReportsTableComponent implements OnInit {
  data;
  columns = [];
  dataSource: any;
  private perPage: number;
  constructor(
    private service: UserDashboardResolveService,
  ) {
    this.columns = ['coinLabel', 'amount', 'txID', 'txConfirmed', 'processed', 'recordCreated'];
  }

  ngOnInit() {
    this.getPayments();
  }
  setData(data?) {
    this.dataSource = new MatTableDataSource(this.data);
  }



  getPayments() {
    this.service.getPayments().subscribe(res => {
      this.data = res;
      this.setData();
    });
  }
  get Data() {
    return [
      {
        created: '12-4-18',
        transaction_id: '23321312321',
        reference: 'ref1213',
        invoice_amount: '3342342',
        status: 'completed'
      },
      {
        created: '12-4-18',
        transaction_id: '23321312321',
        reference: 'ref1213',
        invoice_amount: '3342342',
        status: 'completed'
      },
      {
        created: '12-4-18',
        transaction_id: '23321312321',
        reference: 'ref1213',
        invoice_amount: '3342342',
        status: 'completed'
      },
    ];
  }
}
