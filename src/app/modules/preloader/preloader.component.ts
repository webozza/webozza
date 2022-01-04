import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit, AfterViewInit {
  @ViewChild('loader') loader: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  //  this.renderer.setStyle(this.loader.nativeElement, 'backgroundColor', 'red')
  }
}
