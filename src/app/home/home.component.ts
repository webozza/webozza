import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private _script: ScriptLoaderService) { }

  ngOnInit() {
    this._script
      .loadScripts('body', [
        'assets/js/home/home.js',
        'assets/js/home/rdt.js'
      ])
      .then(result => {
        Helpers.setLoading(false);
      });

  }
  ngAfterViewInit() {
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
}
