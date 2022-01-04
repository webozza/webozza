import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-accounts-invoices',
  templateUrl: './accounts-invoices.component.html',
  styleUrls: ['./accounts-invoices.component.css']
})
export class AccountsInvoicesComponent implements OnInit {

  invoices: any = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("/account/reports/invoices").subscribe(response => {
      if (response.success) {
        this.invoices = response.data;
      }
    });
  }


}
