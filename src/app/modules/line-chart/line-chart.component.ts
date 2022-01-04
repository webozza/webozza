import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"]
})
export class LineChartComponent implements OnInit {
  chart = [];
  constructor() {}

  ngOnInit() {
    this.getChart();
  }
  getChart() {
    this.chart = new Chart("myChart", {
      type: "line",
      data: {
        labels: ["janu", "mon"],
        datasets: [
          {
            data: "200",
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: "500",
            borderColor: "#ffcc00",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }
}
