import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { HttpService } from '../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit, AfterViewInit {
  data;
  script;
  loader = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpService,
    private _script: ScriptLoaderService) {
    this._script
      .loadScripts('body', [
        'assets/js/home/support.min.js',
      ]).then(res => {
      })
      ;
  }


  ngOnInit() {
    this.loadWidget();
  }
  ngAfterViewInit() {

  }

  loadExternalJS() {
    this._script
      .loadScripts('body', [
        'assets/js/home/widget.js',
      ]).then(res => {
      });
  }
  showLoder() {
    const section = this.el.nativeElement.querySelector('.loaded');
    const loader = this.el.nativeElement.querySelector('.loader');
    if (section && loader) {
      setTimeout(() => {
        this.renderer.setStyle(section, 'display', 'block');
      }, 500);
      setTimeout(() => {
        this.renderer.setStyle(loader, 'display', 'none');
      }, 1500);
    }
  }

  loadWidget() {
    this.http.get('payment').toPromise()
      .then(res => {
        if (res.status === 'OK') {
          localStorage.removeItem('payment_url');
          this.data = this.getData(res.result.box);
          this.script = this.getScript(res.result.box);
          this.addScript();
          this.showLoder();
          localStorage.setItem('payment_url', res.result.payment_url);
          this.loadExternalJS();
        }
      //  console.log(res);
      }).catch(err => console.log(err));
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
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.appendChild(document.createTextNode(this.script));
    head.appendChild(script);
  }
}


