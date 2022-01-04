import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../modules/http-with-injector/http.service';

@Component({
  selector: 'app-checkout-create-invoice',
  templateUrl: './checkout-create-invoice.component.html',
})
export class CheckoutCreateInvoiceComponent implements OnInit {

  success_url: String;
  cancel_url: String;
  notification_url: String;
  fiat_currency: String;
  fiat_currency_price: String;
  public_api_token: String;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private http: HttpService
    ) {

    this.route.queryParams.subscribe(params => {
      this.success_url = params['success_url'];
      this.cancel_url = params['cancel_url'];
      this.notification_url = params['notification_url'];
      this.fiat_currency = params['fiat_currency'];
      this.fiat_currency_price = params['fiat_currency_price'];
      this.public_api_token = params['public_api_token'];
      this.paramsInit();
    });
  }

  ngOnInit() {

  }

  paramsInit() {
    if (!this.fiat_currency || !this.fiat_currency_price || !this.public_api_token) {
      debugger;
      // alert("Invoice could not be created. Please try again.");
      // this.router.navigate(["/"], {replaceUrl: true});
      return;
    }

    this.createInvoice();
  }

  // http://localhost:4200/checkout?public_api_token=public_8fea5d-2fe39b-63727c-5d7604-28e31b&fiat_currency=usd&fiat_currency_price=100&notification_url=https:%2F%2Fgoogle.com
  // https://coltpay.com/checkout?public_api_token=public_047334-8ce0f1-4c2792-22f788-a3bc7d&currency=usd&price=5&notification_url=https:%2F%2Fgoogle.com

  createInvoice() {
    this.http.post("/invoice/create", {
      currency: this.fiat_currency,
      price: this.fiat_currency_price,
      notification_url: this.notification_url,
      public_api_token: this.public_api_token,
    }).subscribe(response => {
      if(response.success) {
        this.router.navigate(['/checkout/'+response.data.id+'/'+response.data.guid], {replaceUrl: true, queryParams: { success_url: this.success_url, cancel_url: this.cancel_url } });
      } else {
        alert('Something went wrong. Please try again.');
        this.router.navigate(["/"], {replaceUrl: true});
      }
    }, error => {
      alert('Something went wrong. Please try again.');
      this.router.navigate(["/"], {replaceUrl: true});
  });
  }

}