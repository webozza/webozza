import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../modules/alert/alert.service';
import { UserAuthService } from '../user-auth.service';
import { App } from '../../../globals/app';
import { UserData } from '../../../modules/auth/auth.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  is_Current_register = { email: '', valid: false, message: '' };
  form: FormGroup;
  loading = false;
  sub: Subscription;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  private expireTime = App.ExpiryTime;
  constructor(
    private auth: UserAuthService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alert: AlertService,

  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    const data = localStorage.getItem('userInfo');
    if (data) {
      this.form.patchValue(JSON.parse(data));
    }
    this.check_register_user();
  }

  ngOnInit() {
  }


  private check_register_user() {
    this.auth.userSettings.subscribe(resp => {
      if (resp.reload) {
        this.sub = this.activeRoute.queryParams.subscribe(res => {
          if (res.account) {
            localStorage.removeItem('userInfo');
            this.form.get('email').setValue(res.account);
            this.is_Current_register.email = res.account;
            this.is_Current_register.valid = true;
            this.is_Current_register.message = resp.message;
          }

        });
      }
    });

  }
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  signIn() {
    this.loading = true;
    const data = this.form.getRawValue();
    this.auth.login(this.form.getRawValue()).then(
      res => {
        this.loading = false;
        if (res.success) {
          const userData: UserData = res.data
          this.auth.setLogin(userData);
            this.router.navigateByUrl('/dashboard');
        } else {
          this.alert.error(this.alertContainer, res.errors, true, 5000);
        }
      }).catch(error => {
        this.alert.error(this.alertContainer, 'Something wrong please try again', true, 5000);
        this.loading = false;
      });
  }

}
