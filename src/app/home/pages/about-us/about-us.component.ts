import { Component, OnInit } from '@angular/core';
import { ContentResoveService } from '../../home-servie/content-resolve.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  content;
  constructor(private service: ContentResoveService) {
    this.content = this.service.content.about_us ? this.service.content.about_us : null;
  }

  ngOnInit() {
  }

}
