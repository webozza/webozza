import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  terms_success;
  registration_success;
  status: number;
  constructor(private auth: AuthService) {
    this.changeState();
  }

  ngOnInit() {
  }
  changeState() {
    this.status = this.auth.userData.status;
    switch (this.status) {
      case 2:
        this.terms_success = false;
        this.registration_success = false;
        break;
      case 3:
        this.terms_success = true;
        this.registration_success = false;
        break;
      case 1:
        this.terms_success = true;
        this.registration_success = true;
        break;
    }
  }
}
