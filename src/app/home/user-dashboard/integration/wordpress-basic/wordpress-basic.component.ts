import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wordpress-basic',
  templateUrl: './wordpress-basic.component.html',
  styleUrls: ['./wordpress-basic.component.css']
})
export class WordpressBasicComponent implements OnInit {
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
    selBox.value = `[coltpay-payment id="" class="" amount="" currency=""]`
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
