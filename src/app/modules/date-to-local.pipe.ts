import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateToLocal"
})
export class DateToLocalPipe implements PipeTransform {
  constructor() {}

  transform(value: any, args?: any): any {
    if (value.indexOf("Z") === -1 && value.indexOf("+") === -1) {
      value += "Z";
    }

    if (value === "0000-00-00 00:00:00Z") {
      return new Date();
    }

    if (value === "") {
      return "";
    }

    return new Date(value);
  }
}
