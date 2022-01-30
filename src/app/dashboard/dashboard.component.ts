import { Component, HostListener, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { DateAgoPipe } from "app/pipes/date-ago.pipe";
import { User } from "app/_models/user";
import { AuthenticationService } from "app/_services/authentication.service";
import { MachineService } from "app/_services/machine.service";
import { UpdateDataService } from "app/_services/update-data.service";
import * as Chartist from 'chartist';
import * as $ from "jquery";
import * as moment from 'moment';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [DateAgoPipe]
})
export class DashboardComponent implements OnInit {
  user: User;
  colorDB: string;
  lastUpdatedAt: number;
  refreshCount: number = 0;

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
    private route: ActivatedRoute,
    private updateDataService: UpdateDataService,
    private dateTimeAgo: DateAgoPipe
  ) {
    authService.currentUser.subscribe((x) => (this.user = x));
    updateDataService.graphData.subscribe((x) => { this.graphData = x; console.log(x) });
    // updateDataService.lastUpdatedAt.subscribe((x) => { this.lastUpdatedAt = x; console.log(x) });
  }
  machinename: string;
  machinedata: any[];
  machinedataA: any[];
  machinedataB: any[];
  machinedataC: any[];
  machinedataD: any[];
  machinedataE: any[];
  machinedataF: any[];
  machinedataG: any[];
  machinedataH: any[];
  machinedataI: any[];
  incA: any;
  incB: any;
  incC: any;
  incD: any;
  incE: any;
  incF: any;
  incG: any;
  incH: any;
  incI: any;
  graphData: any = [];
  innerWidth: any;
  datapointskipsize: any = 2;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
    if (this.innerWidth > 786 && this.innerWidth < 1700) { this.datapointskipsize = 5 }
    this.graphA()
    this.graphB()
    this.graphC()
    this.graphD()
    this.graphE()
    this.graphF()
    this.graphG()
    this.graphH()
    this.graphI()
  }
  ngOnInit() {
    this.graphData = this.graphDataPoints()
    this.lastUpdatedAt = Date.now()
    localStorage.setItem('lastUpdatedAt', this.lastUpdatedAt.toString());
    this.updateRefresh()
  }

  updateRefresh() {
    setInterval(() => {
      this.refreshCount = ++this.refreshCount;
    }, 1000);
  }

  graphDataPoints() {
    let listOfMachines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let graphData: any = [];
    listOfMachines.forEach(
      x => {
        var jsonData = { "machinename": x, "skip": 0, "limit": 20 };
        this.machineService.getGraphData(btoa(JSON.stringify(jsonData))).subscribe(data => {
          graphData.push(data)
          if (x == 'a') { this.graphA(data) }
          if (x == 'b') { this.graphB(data) }
          if (x == 'c') { this.graphC(data) }
          if (x == 'd') { this.graphD(data) }
          if (x == 'e') { this.graphE(data) }
          if (x == 'f') { this.graphF(data) }
          if (x == 'g') { this.graphG(data) }
          if (x == 'h') { this.graphH(data) }
          if (x == 'i') { this.graphI(data) }
        });
      }
    );
    return graphData;
  }

  percentageChange(data) {
    // KW x 1000
    // E x PF x 1.73   
    let new_value = data[data.length - 1]['current1']
    let old_value = data[data.length - 2]['current1']
    return (((new_value - old_value) / old_value) * 100)
  }

  graphA(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[1])
    const machineAcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartA = new Chartist.Line('#machineA', machineAcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartA);
    this.incA = this.percentageChange(graphData)
  }

  graphB(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[0])


    const machineBcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartB = new Chartist.Line('#machineB', machineBcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartB);
    this.incB = this.percentageChange(graphData)
  }

  graphC(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[2])


    const machineCcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartC = new Chartist.Line('#machineC', machineCcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartC);
    this.incC = this.percentageChange(graphData)
  }

  graphD(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[3])


    const machineDcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartD = new Chartist.Line('#machineD', machineDcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartD);
    this.incD = this.percentageChange(graphData)
  }

  graphE(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[4])


    const machineEcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartE = new Chartist.Line('#machineE', machineEcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartE);
    this.incE = this.percentageChange(graphData)
  }

  graphF(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[5])


    const machineFcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartF = new Chartist.Line('#machineF', machineFcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartF);
    this.incF = this.percentageChange(graphData)
  }

  graphG(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[6])


    const machineGcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartG = new Chartist.Line('#machineG', machineGcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartG);
    this.incG = this.percentageChange(graphData)
  }

  graphH(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[7])


    const machineHcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartH = new Chartist.Line('#machineH', machineHcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartH);
    this.incH = this.percentageChange(graphData)
  }

  graphI(data = null) {
    let graphData = [];
    (data) ? (graphData = data) : (graphData = this.graphData[8])


    const machineIcurrent: any = {
      labels: graphData.map(x => x['createdOn']).reverse(),
      series: [
        graphData.map(x => x['current1']).reverse(), graphData.map(x => x['current2']).reverse(), graphData.map(x => x['current3']).reverse()
      ]
    };

    const optionsCurrentChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),

      fullWidth: true,
      low: 0,
      high: 90, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 10, right: 10, bottom: 10, left: 0 },
      axisX: {
        // type: Chartist.FixedScaleAxis,
        labelInterpolationFnc: function (value, idx) {
          return idx % 2 === 0 ? moment(value).format('HH:mm') : null;;
        }
      }
    }

    var currentChartI = new Chartist.Line('#machineI', machineIcurrent, optionsCurrentChart);

    this.startAnimationForLineChart(currentChartI);
    this.incI = this.percentageChange(graphData)
  }


}
