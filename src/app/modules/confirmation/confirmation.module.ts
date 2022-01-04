import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationComponent} from './confirmation.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [ConfirmationComponent],
    declarations: [ConfirmationComponent],
    bootstrap: [ConfirmationComponent]
})
export class ConfirmationModule {
}
