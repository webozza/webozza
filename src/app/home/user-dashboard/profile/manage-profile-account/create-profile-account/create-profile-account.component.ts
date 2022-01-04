import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../../../../modules/http-with-injector/http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../modules/alert/alert.service';
import { ContentResoveService } from '../../../../../home/home-servie/content-resolve.service';

@Component({
  selector: 'app-create-profile-account',
  templateUrl: './create-profile-account.component.html',
  styleUrls: ['./create-profile-account.component.css']
})
export class CreateProfileAccountComponent implements OnInit {

  accountForm: FormGroup;
  @ViewChild('hasAlert') alertContainer: ElementRef;

  content: any;
  user: any = {};

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private service: ContentResoveService
  ) {
    this.content = this.service.content;

    if (this.service.content.create_account_promo) {
      this.content = this.service.content.create_account_promo;
    }

    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      website: ['', Validators.required],
      phone: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      wallet_provider: ['', Validators.required],
      wallet_address: ['', Validators.required]
      });
    }

    ngOnInit() {
      this.http.get("/user").subscribe(response => {
        if(response.success) {
          this.user = response.data;
        }
      });
    }
  
submitUpdateProfile() {
  this.http.post("/account/create", this.accountForm.getRawValue()).subscribe(response => {
    if(response.success) {
      alert("Business account created.");
      this.router.navigate(['/account/profile']);
    } else {
      this.alert.error(this.alertContainer, response.errors, true, 5000);
    }
  }, error => {
    this.alert.error(this.alertContainer, error.errors, true, 5000);
  });
}

}
