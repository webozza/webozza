import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../modules/alert/alert.service';
import { UserAuthService } from '../../../user-auth/user-auth.service';
import { HttpService } from '../../../../modules/http-with-injector/http.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  updatePasswordForm: FormGroup;
  profileForm: FormGroup;
  loading: boolean;
  hide = true;
  @ViewChild('hasAlert') alertContainer: ElementRef;

  profile: any = {};

  constructor(
    private http: HttpService,
    private alert: AlertService,
    private auth: UserAuthService,
    private fb: FormBuilder) {
      this.updatePasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        cnFpassword: ['', [Validators.required, Validators.minLength(8)]],
      });

      this.profileForm = this.fb.group({
        email: [this.profile.email, Validators.required],
        first_name: [this.profile.first_name, Validators.required],
        last_name: [this.profile.last_name, Validators.required],
        });
      }

  ngOnInit() {
    this.http.get("/user").subscribe(response => {
      if(response.success) {
          this.profile = response.data;

          this.profileForm.controls['email'].setValue(this.profile.email);
          this.profileForm.controls['first_name'].setValue(this.profile.first_name);
          this.profileForm.controls['last_name'].setValue(this.profile.last_name);
      }
    });

  }

  submitUpdateProfile() {
    this.http.post("/user/update", this.profileForm.getRawValue()).subscribe(response => {
      if(response.success) {
        this.alert.success(this.alertContainer, "Profile updated", true, 5000);
        this.ngOnInit();
      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
      }
    });
  }


  submitUpdatePassword() {
    this.http.post("/user/update/password", this.updatePasswordForm.getRawValue()).subscribe(response => {
      if(response.success) {
        this.alert.success(this.alertContainer, "Password updated", true, 5000);
        this.updatePasswordForm.reset();

      } else {
        this.alert.error(this.alertContainer, response.errors, true, 5000);
      }
    });
  }



}
