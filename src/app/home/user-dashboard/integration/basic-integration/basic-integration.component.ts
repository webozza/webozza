import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-basic-integration',
  templateUrl: './basic-integration.component.html',
  styleUrls: ['./basic-integration.component.css']
})
export class BasicIntegrationComponent implements OnInit {

  @ViewChild('copyButton') copyButton: ElementRef 
  constructor() { }

  ngOnInit() {
  }

  copyCode() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `<a href='https://coltpay.com/checkout?public_api_token=***PUBLIC_TOKEN***&fiat_currency=usd&fiat_currency_price=5.00&notification_url=https://yourwebsite.com/notification' title='Pay with bitcoin'> 
      <img src='/assets/bitcoin-accepted-here.png' alt='Pay with bitcoin button' />
    `
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.setButtonText('Copied!')

    setTimeout(() => this.setButtonText('Copy Code'), 1000)
  }


  setButtonText(text) {
    this.copyButton.nativeElement.innerHTML = text
  }
}

