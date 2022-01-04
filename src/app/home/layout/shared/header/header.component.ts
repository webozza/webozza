import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService) {
  }

  ngOnInit() {
  }
  logout() {
    this.auth.logout().then(res => {
      this.auth.removeUser();
      this.router.navigate(['/login']);
    }).catch(err => {
      this.auth.removeUser();
      this.router.navigate(['/login']);
    });
  }

  navigate() {
    if (this.router.url !== '') {
      this.router.navigate(['']);
    }
  }
}
