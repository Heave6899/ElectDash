import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Paho} from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {

  lineChartData: ChartDataSets[] = [
    { data: [], label: "Voltage", fill: false }
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
  
  private client;

  mqttbroker = 'broker.mqttdashboard.com';

    ngOnInit() {
      this.client = new Paho.MQTT.Client(this.mqttbroker, Number(8000), 'wxview');
      this.client.onMessageArrived = this.onMessageArrived.bind(this);
      this.client.onConnectionLost = this.onConnectionLost.bind(this);
      this.client.connect({onSuccess: this.onConnect.bind(this)});
    }

  onConnect() {
    console.log('onConnect');
    this.client.subscribe('wxstation/wind_speed');
    this.client.subscribe('wxstation/wind_direction');
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onMessageArrived(message) {
    console.log('onMessageArrived: ' + message.destinationName + ': ' + message.payloadString);

    if (message.destinationName.indexOf('wind_speed') !== -1) {
     this.pushEventToChartData(message.payloadString);
    }
  }

  private pushEventToChartData(data): void {
    var x = data.split(" ");
    if (this.isChartDataFull(this.lineChartData, 7)) {
      this.removeLastElementFromChartDataAndLabel();
    }
    this.lineChartData[0].data.push(parseFloat(x[1]));
    this.lineChartLabels.push(
      this.getLabel(data)
    );
  }

  private getLabel(data): string {
    var x = data.split(" ");
    return x[0];
  }
  private removeLastElementFromChartDataAndLabel(): void {
    this.lineChartData[0].data = this.lineChartData[0].data.slice(1);
    this.lineChartLabels = this.lineChartLabels.slice(1);
  }
  private isChartDataFull(chartData: ChartDataSets[], limit: number): boolean {
    return chartData[0].data.length >= limit;
  }
  ngOnDestroy() {
  }
}
