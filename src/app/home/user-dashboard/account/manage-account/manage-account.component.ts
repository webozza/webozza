import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../modules/alert/alert.service';
import { UserAuthService } from '../../../user-auth/user-auth.service';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  accountForm: FormGroup;

  account: any = {};

  public_key = "***hidden***";
  private_key = "***hidden***";
  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private http: HttpService,
    private alert: AlertService,
    private fb: FormBuilder) {
      this.accountForm = this.fb.group({
        name: ['', Validators.required],
        website: ['', Validators.required],
        phone: ['', Validators.required],
        account_invoice_transaction_frequency: ['monthly', Validators.required],
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
    this.http.get("/account").subscribe(response => {
      if(response.success) {
          this.account = response.data;

          this.accountForm.controls['name'].setValue(this.account.name);
          this.accountForm.controls['website'].setValue(this.account.website);
          this.accountForm.controls['phone'].setValue(this.account.phone);
          this.accountForm.controls['account_invoice_transaction_frequency'].setValue(this.account.account_invoice_transaction_frequency);
          this.accountForm.controls['address_line_1'].setValue(this.account.address_line_1);
          this.accountForm.controls['address_line_2'].setValue(this.account.address_line_2);
          this.accountForm.controls['city'].setValue(this.account.city);
          this.accountForm.controls['state'].setValue(this.account.state);
          this.accountForm.controls['zip'].setValue(this.account.zip);
          this.accountForm.controls['wallet_provider'].setValue(this.account.wallet_provider);
          this.accountForm.controls['wallet_address'].setValue(this.account.wallet_address);
      }
    });

  }

  submitUpdateProfile() {
    this.http.post("/account/update", this.accountForm.getRawValue()).subscribe(response => {
      if(response.success) {
        this.alert.success(this.alertContainer, "Profile updated", true, 5000);
        this.ngOnInit();
      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
      }
    });
  }

  regenerateKey(type) {
    this.http.post("/account/update/key", {type: type}).subscribe(response => {
      if(response.success) {
        if(type == "public") {
          this.public_key = response.data;
        } else if (type == "private") {
          this.private_key = response.data;
        }
      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
      }
    });
  }
}
