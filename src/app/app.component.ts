import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  ActivatedRoute
} from "@angular/router";
import { Helpers } from "./helpers";
import { Title } from "@angular/platform-browser";
// import { SwUpdate } from '@angular/service-worker';

declare let gtag: Function;

@Component({
  selector: "body",
  templateUrl: "./app.component.html",
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private _router: Router,
  ) {
    // this.titleService.setTitle("Some title");

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-154508098-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
  }

  ngOnInit() {
    this.setPageTitle();
    this._router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
      }
      if (route instanceof NavigationEnd) {
        Helpers.setLoading(false);
      }
      window.scrollTo(0, 0);
    });
    this.getTitle();
  }

  setPageTitle() {
    this._router.events.subscribe(event => {
      this.titleService.setTitle("ColtPay - " + this.getTitle());
    });
  }
  getTitle() {
    let currentUrl = "";
    const url = this._router.url;
    const routes = url.split("/");
    currentUrl = routes[routes.length - 1];
    return currentUrl ? this.getCapital(currentUrl) : "Home";
  }

  getCapital(page: String) {
    return page[0].toUpperCase() + page.slice(1);
  }
}
