import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmationData} from './confirmation';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {
    }

    ngOnInit() {
    }

    onDialogClose(confirm: boolean) {
        this.data.confirm = confirm;
        this.dialogRef.close(confirm);
    }

}
