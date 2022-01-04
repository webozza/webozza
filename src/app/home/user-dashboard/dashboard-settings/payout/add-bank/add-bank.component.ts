import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Inject
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ValidateRoutingNumber,
  ValidateSwiftCode
} from "../../../../../globals/function";
import { HttpService } from "../../../../../modules/http-with-injector/http.service";
import { AlertService } from "../../../../../modules/alert/alert.service";

@Component({
  selector: "add-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.css"]
})
export class AddBankComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  @ViewChild("hasAlert") alertContainer: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alert: AlertService,
    private http: HttpService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>
  ) {
    this.form = this.fb.group({
      swift_code: ["", [Validators.required, ValidateSwiftCode]],
      account_number: ["", [Validators.required, Validators.minLength(17)]],
      routing_number: ["", [Validators.required, ValidateRoutingNumber]],
      min_settlement_amount_btc: [""]
    });

    if (this.data && this.data.editMode && this.data.editData) {
      this.form.patchValue(this.data.editData);
    }
  }

  ngOnInit() {}
  onDialogClose(confirm: boolean) {
    // this.data.confirm = confirm;
    this.dialogRef.close(confirm);
  }

  submit() {
    this.loading = true;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.loading = false;
      return;
    }

    this.addBankAccount(this.form.getRawValue());
  }

  addBankAccount(data) {
    const url =
      this.data && this.data.editMode
        ? `users/bank-info/${this.data.bank_id}`
        : "users/bank-info";
    this.loading = true;
    this.http
      .post(url, data)
      .toPromise()
      .then(res => {
        this.loading = false;
        if (res.status === "OK") {
          // this.form.reset();
          // this.form.markAsUntouched();
          this.alert.success(
            this.alertContainer,
            res.result.message,
            true,
            4000
          );
          setTimeout(() => {
            this.dialogRef.close(true);
          }, 5000);
        } else {
          this.alert.error(this.alertContainer, res.result.error, true, 5000);
        }
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
}
