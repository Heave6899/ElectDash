import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SseService } from '../../../sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-linechart-va',
  templateUrl: './linechart-va.component.html',
  styleUrls: ['./linechart-va.component.css'],
})
export class LinechartVAComponent implements OnDestroy, OnInit {
  // messages =
  //   {
  //     topic: '',
  //     timestamp: '',
  //     current: '',
  //     voltage: '',
  //     pf: '',
  //     freq: '',
  //     power: '',
  //   };
    message = {
      data: [],
      label: []
    }
    subscription: Subscription;

    constructor(      private messageService : SseService      ){
      
      this.subscription = this.messageService.getMessageA().subscribe(message => {
      //console.log(message);
      if(message){
    //   this.message = {
    //      data: message.data,
    //      label: message.label
    //  }
    this.lineChartData = message.dataV;
    this.lineChartLabels = message.label;
    //console.log(message)
  }
     //console.log(this.message)
      //this.lineChartData = message.data;
      //this.lineChartLabels = message.label;
    });}
    // constructor() {
    //     // subscribe to home component messages
    //     this.subscription = this.messageService.getMessageA().subscribe(message => {
    //       console.log(message);
    //       this.message = {
    //         data: message.data,
    //         label: message.label
    //       }
          // if(message){
        //   this.messages = {
        //     topic: message.topic,
        //     timestamp: message.timestamp,
        //     current: message.current,
        //     voltage: message.voltage,
        //     pf: message.pf,
        //     freq: message.pf,
        //     power: message.power,
        //   }
        // } else {
        //   this.messages = {
        //     topic: '',
        //     timestamp: '',
        //     current: '',
        //     voltage: '',
        //     pf: '',
        //     freq: '',
        //     power: '',
        //   }
          // clear messages when empty message received
        //}
        //console.log(this.messages.topic)
        // if(this.messages.topic == "pibpump/a")
         // this.pushEventToChartData(this.messages);
        //});
        // this.subscription = this.messageService.getMessageV().subscribe(message => {
        //   this.lineChartLabels = message;
        // });
        //console.log(this.messages.topic)
        
    //}

    ngOnInit(){
     
      //this.subscription = this.messageService.getMessageA().subscribe(message => {
        //console.log(message);
        // this.message = {
        //   data: message.data,
        //   label: message.label
        // }
        //this.lineChartData = message.data;
        //this.lineChartLabels = message.label;
      //});
    }
    
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }


  lineChartData: ChartDataSets[]= [
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


  // constructor(private service: SseService){
  //   this.subscription = this.service.getMessage().subscribe(message => {
  //     console.log("received")
  //     if (message) {
  //       this.messages = {
  //         topic: message.topic,
  //         timestamp: message.timestamp,
  //         current: message.current,
  //         voltage: message.voltage,
  //         pf: message.pf,
  //         freq: message.pf,
  //         power: message.power,
  //       }
  //     } else {
  //       this.messages = {
  //         topic: '',
  //         timestamp: '',
  //         current: '',
  //         voltage: '',
  //         pf: '',
  //         freq: '',
  //         power: '',
  //       }
  //       // clear messages when empty message received
  //     }
  //   });
  //   this.pushEventToChartData(this.messages);
  // }

  // public pushEventToChartData(data): void {
  //   if (this.isChartDataFull(this.lineChartData, 7)) {
  //     this.removeLastElementFromChartDataAndLabel();
  //   }
  //   this.lineChartData[0].data.push(parseFloat(data.voltage));
  //   this.lineChartLabels.push(data.timestamp);
  // }

  // private removeLastElementFromChartDataAndLabel(): void {
  //   this.lineChartData[0].data = this.lineChartData[0].data.slice(1);
  //   this.lineChartLabels = this.lineChartLabels.slice(1);
  // }
  // private isChartDataFull(chartData: ChartDataSets[], limit: number): boolean {
  //   return chartData[0].data.length >= limit;
  // }
 
}
