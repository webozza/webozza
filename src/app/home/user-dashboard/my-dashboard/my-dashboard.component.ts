import { Component, OnInit } from "@angular/core";
import { UserDashboardResolveService } from "../../home-servie/user-dashboard.service";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../../../modules/http-with-injector/http.service";
import { ContentResoveService } from "../../home-servie/content-resolve.service";
import { Chart } from 'angular-highcharts';


@Component({
  selector: "app-my-dashboard",
  templateUrl: "./my-dashboard.component.html",
  styleUrls: ["./my-dashboard.component.css"]
})
export class MyDashboardComponent implements OnInit {

  
  chart = new Chart({
    chart: {
      type: 'solidgauge',
      height: '110%',
     
  },

  title: {
      text: '|',
      style: {
          fontSize: '10px'
      }
  },

  tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      shadow: false,
      style: {
          fontSize: '16px'
      },
      pointFormat: '<div class="chart-tooltip"  style="color: {point.color}; justify-content: center"><div>${point.y}</div><br><div style="font-size:10px; color: {point.color} text-align: center; width: 30px">Total</div></div>',
      positioner: function (labelWidth) {
          return {
              x: (this.chart.chartWidth - labelWidth) / 2,
              y: (this.chart.plotHeight / 2) + 15
          };
      }
  },

  pane: {
      startAngle: 0,
      endAngle: 360,
      background: [ { // Track for Exercise
          outerRadius: '80%',
          innerRadius: '68%',
          backgroundColor: "lightgrey",
          borderWidth: 0
      }, { // Track for Stand
          outerRadius: '66%',
          innerRadius: '54%',
          backgroundColor: "lightgrey",
          borderWidth: 0
      }]
  },

  yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true,
          showInLegend: true
      }
  },

  series: [{
      name: 'Item1',
      type: undefined,
      data: [{
          color: '#2f365f',
          radius: '80%',
          innerRadius: '68%',
          y: 80
      }]
  }, {
      name: 'Item 2',
      type: undefined,

      data: [{
          color: 'grey',
          radius: '66%',
          innerRadius: '54%',
          y: 45
      }]
  }]
  });

  content;
  today: any = {};
  todayLoaded = false;
  account: any
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private service: ContentResoveService
  ) {
    this.content = this.service.content;

    if (this.service.content.dashboard) {
      this.content = this.service.content.dashboard;
    }

  }
  ngOnInit() {

    this.http.get("/account/dashboard").subscribe(response => {
      let data = JSON.parse(JSON.stringify(response));
      if (data.success) {
        this.today = data.data;
        this.todayLoaded = true;
      }
    });



    this.http.get("/user").subscribe(response => {
      if(response.success) {
          this.account = response.data.account;
      }
    });

  }
}
