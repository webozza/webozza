import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsFilterComponent } from './reports-filter/reports-filter.component';
import { ReportsTableComponent } from './reports-table/reports-table.component';
import { MatTableModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ReportsTableComponent, ReportsFilterComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
    exports: [MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatCheckboxModule, ReportsTableComponent, ReportsFilterComponent, MatTableModule, MatIconModule]
})
export class DashboardReportsModule { }
