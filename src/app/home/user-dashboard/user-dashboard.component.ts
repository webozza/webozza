import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helpers } from '../../helpers';
import { HttpService } from '../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit, AfterViewInit {

  account_user: any = {};
  account: any = {};
  user: any = {};
  url : string = ''
  addBackground:boolean = true;
  constructor(
    private http: HttpService,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    this.http.get("/user").subscribe(response => {
      if(response.success) {
        this.user = response.data;
        this.account = response.data.account;
        this.account_user = response.data.account_user;
      }
    });

    
    setInterval(() => this.getRoute(), 500 )
  }

  getRoute() {
     this.url = this.router.url;
     console.log(this.url)

     if(this.url === '/dashboard/profile/account') {
      this.addBackground = false
     } else if(this.url === '/dashboard/account/profile') {
      this.addBackground = false
     } else if(this.url === '/dashboard/account/users') {
      this.addBackground = false
     }  else {
       this.addBackground = true
     }

    
  }

  ngAfterViewInit() {

    // $('#accordianmenu a').click(function () {
    //   $('#accordianmenu ul ul').slideUp();
    //   if (!$(this).next().is(':visible')) {
    //     $(this).next().slideDown();
    //   }
    // });
    $('.dashboard-togglemenu, .mobile-accordian ul li a, document').on('click', function () {
      $('.mobile-accordian').slideToggle();
    });

    $('.mobile-toggle .menu-bar').on('click', function (e) {
      e.stopPropagation();
    });
  }
}
