import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContentResoveService } from '../../home-servie/content-resolve.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../modules/http-with-injector/http.service';
import { AlertService } from '../../../modules/alert/alert.service';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  loader: boolean;
  form: FormGroup;
  tempPhoneNum: number;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  content;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private alert: AlertService,
    private service: ContentResoveService) {
    this.content = this.service.content;
    this.form = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      myRecaptcha: ['']
    });
  }

  ngOnInit() {
  }
  submit() {
    // console.log(this.form.getRawValue());
    this.loader = true;
    this.http.post('contact-us', this.form.getRawValue()).toPromise()
      .then(res => {
        this.loader = false;
        if (res.status === 'OK') {
          this.alert.success(this.alertContainer, 'Message sent successfully. Thank you.', true, 3000);
          this.form.reset();
        }
      }).catch(err => {
        this.loader = false;
        this.alert.error(this.alertContainer, 'Somethig wrong  !! Please try again  ', true, 3000);
      });

  }
  onScriptLoad() {
    // console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA');
  }
}
