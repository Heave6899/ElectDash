import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { User } from "app/_models/user";
import { AuthenticationService } from "app/_services/authentication.service";
import { MachineService } from "app/_services/machine.service";
import * as Chartist from 'chartist';
import * as $ from "jquery";
import * as moment from 'moment';

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.scss"],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExportComponent implements OnInit {
  user: User;
  colorDB: string;

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  constructor(
    authService: AuthenticationService,
    private machineService: MachineService,
    private route: ActivatedRoute
  ) {
    this.machinename = route.snapshot.paramMap.get("machinename");
    authService.currentUser.subscribe((x) => (this.user = x));
  }
  machinename: string;
  machinedata: any[]
  machinedataA: any[];
  machinedataB: any[];
  async ngOnInit() {
    this.machinedata = await this.machineService
      .getTableData('b')
      .toPromise();
    this.machinedataA = await this.machineService
      .getGraphData('a')
      .toPromise();
    this.machinedataB = await this.machineService
      .getGraphData('b')
      .toPromise();

    this.graphA()
    this.graphB()
  }
  graphA() {
    const dataDailySalesChart: any = {
      labels: this.machinedataA['phaseOne'].map(x => x['createdOn']).slice(0, 10).reverse(),
      series: [
        this.machinedataA['phaseOne'].map(x => x['current']).slice(0, 10).reverse(), this.machinedataA['phaseTwo'].map(x => x['current']).slice(0, 10).reverse(), this.machinedataA['phaseThree'].map(x => x['current']).slice(0, 10).reverse()
      ]
    };

    console.log(dataDailySalesChart)

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true,
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 10, bottom: 0, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var dailySalesChart = new Chartist.Line('#machineA', dataDailySalesChart, optionsDailySalesChart);

    //this.startAnimationForLineChart(dailySalesChart);
  }

  graphB() {
    const dataDailySalesChart: any = {
      labels: this.machinedataB['phaseOne'].map(x => x['createdOn']).slice(0, 10).reverse(),
      series: [
        this.machinedataB['phaseOne'].map(x => x['current']).slice(0, 10).reverse(), this.machinedataB['phaseTwo'].map(x => x['current']).slice(0, 10).reverse(), this.machinedataB['phaseThree'].map(x => x['current']).slice(0, 10).reverse()
      ]
    };

    console.log(dataDailySalesChart)

    const optionsDailySalesChart: any = {
      // lineSmooth: Chartist.Interpolation.cardinal({
      //   tension: 0.2
      // }),
      fullWidth: true,
      low: 0,
      high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 10, bottom: 0, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var dailySalesChart = new Chartist.Line('#machineB', dataDailySalesChart, optionsDailySalesChart);

    //this.startAnimationForLineChart(dailySalesChart);
  }
}
