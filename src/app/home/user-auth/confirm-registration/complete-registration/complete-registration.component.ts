import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl
} from "@angular/forms";
import { AlertService } from "../../../../modules/alert/alert.service";
import { UserAuthService } from "../../user-auth.service";
import { AuthService } from "../../../../modules/auth/auth.service";
import {
  validateWallet,
  ValidateUrl,
  ValidateEIN
} from "../../../../globals/function";

@Component({
  selector: "complete-registration",
  templateUrl: "./complete-registration.component.html",
  styleUrls: ["./complete-registration.component.css"]
})
export class CompleteRegistrationComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  @ViewChild("hasAlert") alertContainer: ElementRef;
  @Output() changeState = new EventEmitter();
  isValid = undefined;
  isValid_2nd = undefined;
  constructor(
    private authService: AuthService,
    private auth: UserAuthService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      business_name: ["", Validators.required],
      ein: ["", [Validators.required, ValidateEIN]],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: [""],
      zip: [""],
      website: ["", [Validators.required, ValidateUrl]],
      phone_number: ["", Validators.required],
      wallet_provider: ["", Validators.required],
      wallet_address: ["", Validators.required],
      secondary_wallet_provider: [""],
      secondary_wallet_address: [""],
      authorized_persons: this.fb.array([
        // this.initAuthorizedPersion()
      ])
    });
  }

  ngOnInit() {}
  initAuthorizedPersion() {
    return this.fb.group({
      name: [""],
      email: ["", [Validators.email]]
    });
  }

  addPersion() {
    // add Persion to the list
    const control = <FormArray>this.form.controls["authorized_persons"];
    control.push(this.initAuthorizedPersion());
  }
  removePersion(i: number) {
    // remove Persion to the list
    const control = <FormArray>this.form.controls["authorized_persons"];
    control.removeAt(i);
  }

  submit() {
    this.loading = true;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        // {1}
        const control = this.form.get(field); // {2}
        control.markAsTouched({ onlySelf: true }); // {3}
      });
      //   this.showFormValidations();
      this.loading = false;
      return;
    }
    this.showFormValidations();
    this.auth
      .completeRegistration(this.form.getRawValue())
      .then(res => {
        this.loading = false;
        if (res.status === "OK") {
          this.auth.changeState().then(resp => {
            if (resp.status === "OK") {
              const data = this.authService.userData;
              data.status = 1;
              this.auth.setLogin(data);
              this.changeState.emit(true);
            }
          });
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 5000);
        }
        console.log(res);
      })
      .catch(error => {
        this.alert.error(
          this.alertContainer,
          "Something wrong please try again",
          true,
          5000
        );
        this.loading = false;
      });
  }

  showFormValidations() {
    if (this.form.invalid) {
      this.alert.error(
        this.alertContainer,
        "You have to fill out all the required fields",
        true,
        5000
      );
    }
  }
  focusOutFunction() {
    const wallet_address = this.form.get("wallet_address").value;
    if (wallet_address) {
      validateWallet(wallet_address).then(res => {
        this.isValid = res;
      });
    } else {
      this.isValid = undefined;
    }
  }
  secondayValidate() {
    const wallet_address = this.form.get("secondary_wallet_address").value;
    if (wallet_address) {
      validateWallet(wallet_address).then(res => {
        this.isValid_2nd = res;
      });
    } else {
      this.isValid_2nd = undefined;
    }
  }
}
