import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ContentResoveService } from '../../../home-servie/content-resolve.service';
import { FormControl, Validators } from '@angular/forms';
import { UserAuthService } from '../../user-auth.service';
import { AuthService } from '../../../../modules/auth/auth.service';
import { AlertService } from '../../../../modules/alert/alert.service';

@Component({
  selector: 'terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  content;
  submitting: boolean;
  @ViewChild('hasAlert') alertContainer: ElementRef;
  isChecked = new FormControl('', Validators.required);
  @Output() changeState = new EventEmitter();
  constructor(
    private alert: AlertService,
    private userAuth: UserAuthService,
    private auth: AuthService,
    private service: ContentResoveService) {
    this.content = this.service.content;
    if (this.service.content.terms_condition) {
      this.content = this.service.content.terms_condition;
    }
  }

  ngOnInit() {
  }
  submit() {
    this.submitting = true;
    this.userAuth.changeState().then(res => {
      this.submitting = false;
      if (res.status === 'OK') {
        const data = this.auth.userData;
        data.status = 3;
        this.userAuth.setLogin(data);
        this.changeState.emit(true);
      }
    }).catch(error => {
      this.alert.error(this.alertContainer, 'Something wrong please try again', true, 5000);
      this.submitting = false;
    });
  }
}
