import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../modules/alert/alert.service';
import { validatedEmail } from '../../../globals/function';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { AuthService } from '../../../modules/auth/auth.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  @ViewChild('hasAlert') alertContainer: ElementRef;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private http: HttpService,
    private _script: ScriptLoaderService
  ) {
    const ref = (document.cookie.match(/^(?:.*;)?\s*ref\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      agree_terms_and_conditions: [false, Validators.requiredTrue],
      ref: ref
    });
  }

  ngOnInit() {
    this._script
      .loadScripts("body", ["assets/js/home/rdt.js"])
      .then(res => {});
  }
  signUp() {
    if (this.form.invalid) {
      return;
    }

    this.http.post("/auth/register", this.form.getRawValue()).subscribe(response => {
      if(response.success) {
          this.auth.setLoginData(response.data);
          this.router.navigate(['/dashboard/profile/account/create']);
      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
        return;
      }
  });


  }

}
