import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../modules/auth/auth.service";
import { Router } from "@angular/router";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";

@Component({
  selector: "dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["../../user-dashboard.component.css"]
})
export class DashboardHeaderComponent implements OnInit {
  testMode: boolean;
  user: any
  constructor(
    private router: Router,
    public auth: AuthService,
    private service: UserDashboardResolveService

  ) {}

  ngOnInit() {
    this.service.modeSettings.subscribe(res => {
      if (res.reload) {
        this.testMode = res.testMode;
      }
    });

    this.getUser() 
  }


  getUser() {
    let user = localStorage.getItem('currentUser');
    this.user = user ? JSON.parse(user) : false;
  }

  logout() {
    this.auth
      .logout()
      .then(res => {
        this.auth.removeUser();
        this.router.navigate(["/login"]);
      })
      .catch(err => {
        this.auth.removeUser();
        this.router.navigate(["/login"]);
      });
  }
}
