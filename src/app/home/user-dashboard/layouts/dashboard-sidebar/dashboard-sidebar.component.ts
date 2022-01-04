import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../../modules/http-with-injector/http.service";

@Component({
  selector: "dashboard-sidebar",
  templateUrl: "./dashboard-sidebar.component.html",
  styleUrls: ["../../user-dashboard.component.css"]
})
export class DashboardSidebarComponent implements OnInit {

  account_user: any = {};
  account: any = {};
  constructor(
    private http: HttpService

  ) { }

  ngOnInit() {
    this.http.get("/user").subscribe(response => {
      if(response.success) {
          this.account = response.data.account;
          this.account_user = response.data.account_user;
      }
    });
  }

}
