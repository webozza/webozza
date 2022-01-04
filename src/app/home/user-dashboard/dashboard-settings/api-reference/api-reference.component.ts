import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDashboardResolveService } from '../../../home-servie/user-dashboard.service';
import { AlertService } from '../../../../modules/alert/alert.service';
import { ValidateUrl, protocols } from '../../../../globals/function';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-api-reference',
  templateUrl: './api-reference.component.html',
  styleUrls: ['./api-reference.component.css']
})
export class ApiReferenceComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submitting: boolean;
  protocols = protocols;
  url_selected = 1;
  redirect_url_selected = 2;
  url = { protocol: 'http://' };
  callBack_url = { protocol: 'http://' };
  @ViewChild('hasAlert') alertContainer: ElementRef;
  constructor(
    private alert: AlertService,
    private service: UserDashboardResolveService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      notification_url: ['', [Validators.required, ValidateUrl]],
      redirect_url: ['', [Validators.required, ValidateUrl]],
      api_key: [{ value: '', disabled: true }, [Validators.required]],
    });
  }

  ngOnInit() {
    this.generateKey();
    this.getInfo();
  }

  getInfo() {
    Helpers.setLoading(true);
    this.service.getUrl().then(res => {
      // console.log(res)
      const values = res.result.data;
      if (values.notification_url && values.redirect_url) {
        // tslint:disable-next-line:forin
        for (const c in values) {
          this.setSlectedProtocol(values[c], c);
        }
      }
      Helpers.setLoading(false);
    });




  }
  submit() {
    this.loading = true;
    const obj = {
      redirect_url: this.callBack_url.protocol + this.form.get('notification_url').value,
      notification_url: this.url.protocol + this.form.get('notification_url').value
    };
    this.service.changeApi(obj).then(res => {
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
  generateKey() {
    this.submitting = true;
    this.service.generateKey().then(res => {
      if (res.status === 'OK') {
        this.submitting = false;
        this.form.get('api_key').setValue(res.result.data);
      }
    });
  }

  setUrlPrototcol(e, type) {
    if (type === 1) {
      this.url.protocol = e;
    } else {
      this.callBack_url.protocol = e;
    }
  }

  setSlectedProtocol(data, type) {
    const url = data.split('www');
    const id = url[0] === 'http://' ? 1 : 2;
    if (type === 'notification_url') {
      this.url_selected = id;
      this.url.protocol = url[0];
      this.form.get('notification_url').setValue('www' + url[1]);
    } else {
      this.callBack_url.protocol = url[0];
      this.redirect_url_selected = id;
      this.form.get('redirect_url').setValue('www' + url[1]);
    }

  }
}
