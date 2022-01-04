import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
  OnDestroy
} from "@angular/core";
import { ScriptLoaderService } from "../../../_services/script-loader.service";
import { HttpService } from "../../../modules/http-with-injector/http.service";
import { ActivatedRoute } from "@angular/router";
import { Helpers } from "../../../helpers";

@Component({
  selector: "app-paymout-create",
  templateUrl: "./paymout-create.component.html",
  styleUrls: ["./paymout-create.component.css"]
})
export class PaymoutCreateComponent
  implements OnInit, AfterViewInit, OnDestroy {
  data;
  script;
  script2;
  loader = false;
  notFound = false;
  box: any;
  errorMessage = "Something went Wrong !!! Please Try again ";
  constructor(
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpService,
    private _script: ScriptLoaderService
  ) {
    this._script
      .loadScripts("body", ["assets/js/home/support.min.js"])
      .then(res => {});

    this.route.queryParams.subscribe(res => {
      if (res.api_key && res.amount) {
        this.loadWidget(res.api_key, res.amount);
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    Helpers.removeScript("assets/js/home/widget.js");
  }
  ngAfterViewInit() {}

  loadExternalJS() {
    this._script
      .loadScripts("body", [
        "assets/js/home/widget.js",
        "assets/js/home/payout.js"
      ])
      .then(res => {});
  }
  showLoder() {
    const section = this.el.nativeElement.querySelector(".loaded");
    const loader = this.el.nativeElement.querySelector(".loader");
    if (section && loader) {
      setTimeout(() => {
        this.renderer.setStyle(section, "display", "block");
      }, 500);
      setTimeout(() => {
        this.renderer.setStyle(loader, "display", "none");
      }, 1500);
    }
  }

  loadWidget(api_key, amount) {
    this.http
      .get(`payment?api_key=${api_key}&amount_btc=${amount}`)
      .toPromise()
      .then(res => {
        if (res.status === "OK") {
          localStorage.removeItem("payment_url");
          localStorage.removeItem("redirect");
          this.data = this.getData(res.result.box);
          this.script = this.getScript(res.result.box);
          this.addScript();

          // box 2
          // this.box = this.getBox(res.result.box2);
          // this.script2 = this.getAnotherScript(res.result.box2);
          // this.addScript2();

          this.showLoder();
          localStorage.setItem("payment_url", res.result.payment_url);
          localStorage.setItem("redirect", res.result.redirect);
          this.loadExternalJS();
        } else {
          this.errorMessage = res.result.message;
          this.notFound = true;
        }
        // this.notFound = true;
      })
      .catch(err => (this.notFound = true));
  }

  getScript(res: string) {
    const result = res.split(/(<script>|<\/script>)/);
    return result[2];
  }
  getData(res: string) {
    const result = res.split(/(<script>|<\/script>)/);
    return result[0] + result[4];
  }

  addScript() {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.appendChild(document.createTextNode(this.script));
    head.appendChild(script);
  }

  // box 2
  getAnotherScript(res: string) {
    const result = res.split("<script type='text/javascript'>");
    const re = result[1].split("</script>");
    // console.log(re);
    return "jQuery(document).ready(function(){" + re[0] + "})";
  }
  getBox(res: string) {
    const result = res.split("<script type='text/javascript'>");
    const re = result[1].split("</script>");

    return result[0] + re[1];
  }
  addScript2() {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.appendChild(document.createTextNode(this.script2));
    head.appendChild(script);
  }
}
