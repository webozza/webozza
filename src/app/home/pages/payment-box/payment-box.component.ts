import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';

@Component({
  selector: 'app-payment-box',
  templateUrl: './payment-box.component.html',
  styleUrls: ['./payment-box.component.css']
})
export class PaymentBoxComponent implements OnInit {

  constructor(private _script: ScriptLoaderService) { }

  ngOnInit() {
    this._script
    .loadScripts('body', [
      'assets/js/home/payout.js',
    ]).then(res => {
      this.addScript();
    });
  }
  addScript() {
    const js = ` cryptobox_show(1514, 'bitcoin', '1514AAf8QICBitcoin77BTCPUB7XBxPbmc4uK79CCWHEB5DAmY', 0, 5.5, '60 MINUTE', 'en', 'box1913', 'user4', 'MANUAL', 'product1', '', '', 'f2cea21af212b8a60a1620bc46ea8f79', 530, 230);`;
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(js));
    head.appendChild(script);
  }


  private loadExternalScript() {
    // tslint:disable-next-line:no-unused-expression
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://github.com/cryptoapi/Payment-Gateway/blob/master/js/_source/cryptobox.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
