import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../modules/alert/alert.service';
import { UserAuthService } from '../../../user-auth/user-auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  hide = true;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  constructor(
    private alert: AlertService,
    private auth: UserAuthService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      cnFpassword: ['', [Validators.required, Validators.minLength(6)]],
      old_password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  ngOnInit() {
  }
  submit() {
    this.loading = true;
    this.auth.changePassword(this.form.getRawValue()).then(res => {
      this.loading = false;
      if (res.status === 'OK') {
        this.alert.success(this.alertContainer, res.result.message, true, 5000);
        this.form.reset();
      } else {
        this.alert.error(this.alertContainer, res.result.error, true, 5000);
      }
    }).catch(error => {
      this.alert.error(this.alertContainer, 'Something wrong please try again', true, 5000);
      this.loading = false;
    });
  }
}
