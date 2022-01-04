import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: any = [];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("/invoices").subscribe(response => {
      if (response.success) {
        this.invoices = response.data;
      }
    });
  }

}
