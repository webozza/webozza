import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScriptLoaderService } from "../_services/script-loader.service";
import { Invoice } from "../globals/types";
import { HttpService } from "../modules/http-with-injector/http.service";
import { map, catchError } from "rxjs/operators";
import { PusherService } from "../_services/pusher.service";

let socket: any;
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  invoice: Invoice;
  payment_success: boolean;
  checkout_img: String = "";
  success_url: String = "";
  cancel_url: String = "";
  id: String = "";
  guid: String = "";

  blockchainDisclaimer = true;
  showCancelButton = false;

  claimsHasPaid = false;
    constructor(
    private _script: ScriptLoaderService,
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private pusherService: PusherService
  ) {
    this.route.queryParams.subscribe(params => {
      this.success_url = params['success_url']  ? params['success_url'] : "http://coltpay.com";
      this.cancel_url = params['cancel_url'] ? params['cancel_url'] : "http://coltpay.com";

      this.id = this.route.snapshot.paramMap.get("id");
      this.guid = this.route.snapshot.paramMap.get("guid");
  });
  }  

  ngOnInit() {
    this.loadInvoice();
  }

  ngOnDestroy() {
    if(this.invoice && this.invoice.id) {
      this.pusherService.channel.unsubscribe('invoice-' + this.invoice.id);
    }
  }

  clickClaimsHasPaid() {
    this.claimsHasPaid = true;
    this.blockchainDisclaimer = false;
    this.showCancelButton = false;

    this.removeQrCode(true);
  }

  loadInvoice() {
    this.http.get("/invoice/"+this.id+"/"+this.guid).subscribe(response => {
        if(response.success) {
            this.invoice = response.data;
            this.checkout_img = this.invoice.qr_image;

            this.pusherService.channel = this.pusherService.pusher.subscribe('invoice-' + this.invoice.id);

            this.pusherService.channel.bind('update', data => {
              if(this.invoice.status != data.invoice.status) {
                if(data.invoice.status == 'paid' || data.invoice.status == 'confirmed' || data.invoice.status == 'complete') {
                  this.markAsPaid();
                } else if(data.invoice.status == "expired" || data.invoice.status == "invalid") {
                  this.markAsExpired();
                }
              }
              this.invoice = data.invoice;
            });
        
        } else {
          this.invoiceLoadError(response.errors);
          return;
        }
    });
  }

  invoiceLoadError(errors) {
    alert(errors);
    this.router.navigate(["/"]);
    debugger;
  }

  markAsPaid() {
    this.removeQrCode(true);
    this.blockchainDisclaimer = false;
  }

  markAsExpired() {
    this.removeQrCode(false);
    this.blockchainDisclaimer = false;
  }

   removeQrCode(paid: Boolean) {
      const backBtn = document.querySelector(".back-btn");
      const amounBtn = document.querySelector(".amount-btn");
      if(paid){ this.checkout_img = "./assets/img/paid-image.png";}
      if(backBtn) {backBtn.setAttribute("style", "display:block");}
      if(amounBtn) {amounBtn.setAttribute("style", "display:none");}
    }
}
