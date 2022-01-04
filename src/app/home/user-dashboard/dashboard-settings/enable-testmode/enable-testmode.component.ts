import { Component, OnInit } from "@angular/core";
import { UserDashboardResolveService } from "../../../home-servie/user-dashboard.service";

@Component({
  selector: "app-enable-testmode",
  templateUrl: "./enable-testmode.component.html",
  styleUrls: ["./enable-testmode.component.css"]
})
export class EnableTestmodeComponent implements OnInit {
  testMode = false;
  constructor(private service: UserDashboardResolveService) {}

  ngOnInit() {}
  setMode() {
    this.testMode = !this.testMode;
  //  console.log("c", this.testMode);
    this.service.modeSettings.next({ reload: true, testMode: this.testMode });
  }
}
