import { Component, OnInit } from "@angular/core";
import { ContentResoveService } from "../../home-servie/content-resolve.service";
import { ActivatedRoute } from "@angular/router";
import { Faq } from "../../../globals/types";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"]
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];
  constructor(private route: ActivatedRoute) {
    this.faqs = this.route.snapshot.data.faqs;
  }

  ngOnInit() {}
}
