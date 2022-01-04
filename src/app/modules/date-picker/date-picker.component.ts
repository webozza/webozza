import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  rental_date: any;
  @Input() placeholder: string; // placeholder for input filed
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectedDate = new EventEmitter;
  constructor() {
    const date = new Date();
  }

  ngOnInit() {
  }
  selectDate(e) {
    const formatDate = e.year + '-' + e.month + '-' + e.day;
    this.onSelectedDate.emit(formatDate);
  }



  generateDateFormat() {
    let day;
    let month;
    let year;
    const date = this.rental_date.year ? new Date(this.rental_date.year, this.rental_date.month, this.rental_date.day) : new Date();
    if (this.rental_date.year) {
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }
    day = date.getDate();
    const d = year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + 0;
    return d;
  }
}
