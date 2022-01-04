import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';
import { AlertService } from '../../../modules/alert/alert.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  constructor(
    private auth: UserAuthService,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private http: HttpService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }
  submit() {
    this.http.post("/auth/forgot-password", this.form.getRawValue()).subscribe(response => {
      if(response.success) {
        this.alert.success(this.alertContainer, response.data, true, 5000);
      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
        return;
      }
  });
  }
}
