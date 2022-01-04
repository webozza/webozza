import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserAuthService } from '../../user-auth.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../../modules/http-with-injector/http.service';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-forgot-password-reset-password',
  templateUrl: './forgot-password-reset-password.component.html',
  styleUrls: ['./forgot-password-reset-password.component.css']
})
export class ForgotPasswordResetPasswordComponent implements OnInit {

  id: String;
  token: String;

  resetIsValid = false;

  updatePasswordForm: FormGroup;

  @ViewChild('hasAlert') alertContainer: ElementRef;
  constructor(
    private auth: UserAuthService,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute
  ) {
    this.updatePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      cnFpassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.token = params['token'];

      this.loadReset();
  });

  }

  ngOnInit() {
  }

  loadReset() {
    this.http.get("/auth/forgot-password/reset/"+this.id+"/"+this.token).subscribe(response => {
      if(response.success) {
        this.resetIsValid = true;
      } else {
        alert(response.errors);
        return;
      }
    });
  }

  submit() {

    this.http.post("/auth/forgot-password/reset/"+this.id, {
      token: this.token,
      password: this.updatePasswordForm.controls['password'].value
    }).subscribe(response => {
      if(response.success) {
          alert('Your password has been reset. You can now login.');
          this.router.navigate(['/sign-in']);
      } else {
        alert(response.errors);
        return;
      }
    });

  }

}
