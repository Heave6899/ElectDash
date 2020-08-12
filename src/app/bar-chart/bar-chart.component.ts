import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }],
      yAxes: [{
        ticks: { fontColor: 'white',        beginAtZero: true      },
        gridLines: { color: 'rgba(255,255,255,0.1)',  },

      }]
    },
    legend: {
      labels: { fontColor: 'white', }
    },
  };

  BarChartColors : Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'rgba(255,255,255,0.28)',
    },
  ];

  public barChartLabels: Label[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Total Consumption per day' },
    
  ];

  constructor() { }

  ngOnInit() {
  }

}
