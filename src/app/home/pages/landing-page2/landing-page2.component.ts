import { Component, OnInit } from '@angular/core';
import { ContentResoveService } from '../../home-servie/content-resolve.service';

@Component({
  selector: 'app-landing-page2',
  templateUrl: './landing-page2.component.html',
  styleUrls: ['./landing-page2.component.css']
})
export class LandingPage2Component implements OnInit {

  content;
  constructor(
    private service: ContentResoveService) {
    this.content = this.service.content;
  }

  ngOnInit() {
  }

}
