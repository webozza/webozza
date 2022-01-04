import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-extract-pamyents',
  templateUrl: './extract-pamyents.component.html',
  styleUrls: ['./extract-pamyents.component.css']
})
export class ExtractPamyentsComponent implements OnInit {
  loading: boolean;
  selectall: boolean;
  status = new FormControl();
  statusList: string[] = [
    'Awaiting',
    'Incomplete',
    'Pending',
    'Dispute',
    'Returned',
    'Canceled',
  ];
  data;
  columns = [];
  dataSource: any;
  private perPage: number;
  constructor() {
    this.columns = ['created', 'name', 'value', 'status'];
  }

  ngOnInit() {
    this.setData();
  }
  setData(data?) {
    this.dataSource = new MatTableDataSource(this.Data);
  }

  selectAllStatus() {
    console.log('call', [this.selectall, this.statusList]);
    if (this.selectall === false) {
      this.status = new FormControl();
      return;
    } else if (this.selectall === true) {
      this.status = new FormControl();
      this.status.setValue(this.statusList);
    }
  }
  get Data() {
    return [
      {
        created: '12-4-18',
        name: 'Jhon Doe',
        value: '0.00031 BTC',
        status: 'completed'
      },
      {
        created: '12-4-18',
        name: 'Jhon Kabir',
        value: '0.00031 BTC',
        status: 'Awaiting Payments'
      },
      {
        created: '12-4-18',
        name: 'Jhon Cena',
        value: '0.00031 BTC',
        status: 'completed'
      },
      {
        created: '12-4-18',
        name: 'Mr Boltu',
        value: '0.00031 BTC',
        status: 'Awaiting Payments'
      },

    ];
  }
}
