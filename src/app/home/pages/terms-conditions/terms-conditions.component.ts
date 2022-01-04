import { Component, OnInit } from "@angular/core";
import { ContentResoveService } from "../../home-servie/content-resolve.service";

@Component({
  selector: "app-terms-conditions",
  templateUrl: "./terms-conditions.component.html",
  styleUrls: ["./terms-conditions.component.css"]
})
export class TermsConditionsComponent implements OnInit {
  content;
  constructor(private service: ContentResoveService) {
    this.content = this.service.content;
    if (this.service.content.terms_condition) {
      this.content = this.service.content.terms_condition;
    }
  }

  ngOnInit() {}
}
