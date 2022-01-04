import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateWalletAddress } from '../../../../globals/function';
import { UserDashboardResolveService } from '../../../home-servie/user-dashboard.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  constructor(
    private service: UserDashboardResolveService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      wallet_provider: ['', Validators.required],
      wallet_address: ['', [Validators.required, ValidateWalletAddress]],
      secondary_wallet_provider: [''],
      secondary_wallet_address: ['']
    });
    this.getInfo();
    this.formControlValueChanged();
  }

  ngOnInit() {

  }
  getInfo() {
    Helpers.setLoading(true);
    this.service.getUserInfo().then(res => {
      this.form.patchValue(res);
      Helpers.setLoading(false);
    });
  }

  submit() {
    this.loading = true;
    this.service.changeWalletInfo(this.form.getRawValue()).then(res => {
      if (res.status === 'OK') {
        this.loading = false;
        this.alert.success(this.alertContainer, res.result.message, true, 5000);
      } else {
        this.alert.error(this.alertContainer, res.result.error, true, 5000);
      }
    }).catch(err => {
      this.alert.error(this.alertContainer, 'Something wrong please try again', true, 5000);
      this.loading = false;
    });
  }

  formControlValueChanged() {
    const Control = this.form.controls['secondary_wallet_address'];
    this.form.get('secondary_wallet_address').valueChanges.subscribe(
      (type: string) => {
        if (type === '') {
          Control.clearValidators();
          Control.setErrors(null);
          Control.reset();
        } else {
          Control.setValidators([ValidateWalletAddress]);
        }
       // Control.updateValueAndValidity();
      });

  }
}
