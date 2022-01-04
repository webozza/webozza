import { Component, OnInit } from '@angular/core';
import { ContentResoveService } from '../../../home-servie/content-resolve.service';

@Component({
  selector: 'home-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contents;
  constructor(
    private service: ContentResoveService) {
    this.contents = this.service.content;
    // console.log(this.contents)
  }
  ngOnInit() {

  }

}
