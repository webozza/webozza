import { Component, OnInit } from '@angular/core';
import { Content } from '../../home-modules/type.model';
import { isJson } from '../../../globals/function';
import { ContentResoveService } from '../../home-servie/content-resolve.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  content;
  constructor(
    private service: ContentResoveService) {
    this.content = this.service.content;
  }

  ngOnInit() {
  }
}
