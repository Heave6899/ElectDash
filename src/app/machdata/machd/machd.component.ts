import { Component, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SseService } from '../../sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-machd',
  templateUrl: './machd.component.html',
  styleUrls: ['./machd.component.css']
})
export class MachdComponent implements OnDestroy {

  subscription: Subscription;

  /*Charts start here*/
  lineChartDataA: ChartDataSets[] = [
    { data: [], label: "Current", fill: false }
  ];

  lineChartDataV: ChartDataSets[] = [
    { data: [], label: "Current", fill: false }
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    animation: {
      duration: 0
    },
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }],
      yAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }]
    },
    legend: {
      labels: { fontColor: 'white', fontWeight: '200' }
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'rgba(255,255,255,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  /*Charts stop here*/


  constructor(private messageService:SseService) {
    this.subscription = this.messageService.getMessageD().subscribe(message => {
      if(message){
        this.lineChartDataA = message.dataA;
        this.lineChartDataV = message.dataV;
        this.lineChartLabels = message.label;
      }});
   }

   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
