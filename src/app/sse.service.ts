import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Paho } from 'ng2-mqtt/mqttws31';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Injectable({
  providedIn: "root"
})
export class SseService {

  private $graphAResponseSource = new BehaviorSubject<any>(undefined)
  private $graphVResponseSource = new BehaviorSubject<any>(undefined)

  private $graphBResponseSource = new BehaviorSubject<any>(undefined)
  private $graphCResponseSource = new BehaviorSubject<any>(undefined)
  private $graphDResponseSource = new BehaviorSubject<any>(undefined)
  private $graphEResponseSource = new BehaviorSubject<any>(undefined)
  private $graphFResponseSource = new BehaviorSubject<any>(undefined)

  getMessageA(): Observable<any> {
    //console.log(this.$graphAResponseSource)
    return this.$graphAResponseSource.asObservable();
  }
  getMessageV(): Observable<any> {
    //console.log(this.$graphAResponseSource)
    return this.$graphVResponseSource.asObservable();
  }

  getMessageB(): Observable<any> {
    return this.$graphBResponseSource.asObservable();
  }
  getMessageC(): Observable<any> {
    return this.$graphCResponseSource.asObservable();
  }
  getMessageD(): Observable<any> {
    return this.$graphDResponseSource.asObservable();
  }
  getMessageE(): Observable<any> {
    return this.$graphEResponseSource.asObservable();
  }
  getMessageF(): Observable<any> {
    return this.$graphFResponseSource.asObservable();
  }


  private client: any;
  message =
    {
      topic: '',
      timestamp: '',
      current: '',
      voltage: '',
      pf: '',
      freq: '',
      power: '',
    }
    ;
  mqttbroker = 'broker.mqttdashboard.com';

  constructor() {
    this.client = new Paho.MQTT.Client(this.mqttbroker, Number(8000), 'wxview');
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
    console.log("new instance created");
  }


  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
      this.onConnect();
    }
  }
  public onMessage(message: string) { }

  onConnect() {
    this.client.subscribe('pibpump/a');
    this.client.subscribe('pibpump/b');
    this.client.subscribe('pibpump/c');
    this.client.subscribe('pibpump/d');
    this.client.subscribe('pibpump/e');
    this.client.subscribe('pibpump/f');
    console.log('onConnect');
  }

  onMessageArrived = (message: Paho.MQTT.Message) => {
    var x = message.payloadString.split(" ");
    this.message = {
      'topic': message.destinationName,
      'timestamp': x[0],
      'current': x[2],
      'voltage': x[1],
      'pf': x[3],
      'freq': x[4],
      'power': x[5]
    };

    this.pushEventToChartData(this.message);


    //this.subject.next(this.message);
    //console.log(this.message)

  };
  object = {
    dataA: [],
    dataV: [],
    label: []
  };

  public pushEventToChartData(data): void {

    //console.log(this.object)

    //this.$graphAResponseSource.next(this.object);
    //this.$graphVResponseSource.next(this.lineChartLabels);

    if (this.message.topic == "pibpump/a") {
      if (this.isChartDataFull(this.lineChartDataAA, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/a");

      }

      this.lineChartDataAA[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAA[1].data.push(parseFloat(data.freq));
      this.lineChartDataAA[2].data.push(parseFloat(data.power));

      this.lineChartDataVA[0].data.push(parseFloat(data.current));
      this.lineChartDataVA[1].data.push(parseFloat(data.freq));
      this.lineChartDataVA[2].data.push(parseFloat(data.power));

      this.lineChartLabelA.push(data.timestamp);
      this.object = {
        dataA: this.lineChartDataAA,
        dataV: this.lineChartDataVA,
        label: this.lineChartLabelA
      }
      this.$graphAResponseSource.next(this.object)
    }
    if (this.message.topic == "pibpump/b") {
      if (this.isChartDataFull(this.lineChartDataAB, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/b");
      }

      this.lineChartDataAB[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAB[1].data.push(parseFloat(data.freq));
      this.lineChartDataAB[2].data.push(parseFloat(data.power));

      this.lineChartDataVB[0].data.push(parseFloat(data.current));
      this.lineChartDataVB[1].data.push(parseFloat(data.freq));
      this.lineChartDataVB[2].data.push(parseFloat(data.power));

      this.lineChartLabelB.push(data.timestamp);

      this.object = {
        dataA: this.lineChartDataAB,
        dataV: this.lineChartDataVB,
        label: this.lineChartLabelB
      }
      this.$graphBResponseSource.next(this.object)
      //console.log("ok2")
    }
    if (this.message.topic == "pibpump/c") {
      if (this.isChartDataFull(this.lineChartDataAC, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/c");
      }

      this.lineChartDataAC[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAC[1].data.push(parseFloat(data.freq));
      this.lineChartDataAC[2].data.push(parseFloat(data.power));

      this.lineChartDataVC[0].data.push(parseFloat(data.current));
      this.lineChartDataVC[1].data.push(parseFloat(data.freq));
      this.lineChartDataVC[2].data.push(parseFloat(data.power));

      this.lineChartLabelC.push(data.timestamp);

      this.object = {
        dataA: this.lineChartDataAC,
        dataV: this.lineChartDataVC,
        label: this.lineChartLabelC
      }
      this.$graphCResponseSource.next(this.object)
      //console.log("ok3")
    }
    if (this.message.topic == "pibpump/d") {
      if (this.isChartDataFull(this.lineChartDataAD, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/d");
      }

      this.lineChartDataAD[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAD[1].data.push(parseFloat(data.freq));
      this.lineChartDataAD[2].data.push(parseFloat(data.power));

      this.lineChartDataVD[0].data.push(parseFloat(data.current));
      this.lineChartDataVD[1].data.push(parseFloat(data.freq));
      this.lineChartDataVD[2].data.push(parseFloat(data.power));

      this.lineChartLabelD.push(data.timestamp);

      this.object = {
        dataA: this.lineChartDataAD,
        dataV: this.lineChartDataVD,
        label: this.lineChartLabelD
      }
      this.$graphDResponseSource.next(this.object)
      //console.log("ok3")
    }
    if (this.message.topic == "pibpump/e") {
      if (this.isChartDataFull(this.lineChartDataAE, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/e");
      }

      this.lineChartDataAE[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAE[1].data.push(parseFloat(data.freq));
      this.lineChartDataAE[2].data.push(parseFloat(data.power));

      this.lineChartDataVE[0].data.push(parseFloat(data.current));
      this.lineChartDataVE[1].data.push(parseFloat(data.freq));
      this.lineChartDataVE[2].data.push(parseFloat(data.power));

      this.lineChartLabelE.push(data.timestamp);

      this.object = {
        dataA: this.lineChartDataAE,
        dataV: this.lineChartDataVE,
        label: this.lineChartLabelE
      }
      this.$graphEResponseSource.next(this.object)
    }
    if (this.message.topic == "pibpump/f") {
      if (this.isChartDataFull(this.lineChartDataAF, 7)) {
        this.removeLastElementFromChartDataAndLabel("pibpump/f");
      }

      this.lineChartDataAF[0].data.push(parseFloat(data.power) + 6);
      this.lineChartDataAF[1].data.push(parseFloat(data.freq));
      this.lineChartDataAF[2].data.push(parseFloat(data.power));

      this.lineChartDataVF[0].data.push(parseFloat(data.current));
      this.lineChartDataVF[1].data.push(parseFloat(data.freq));
      this.lineChartDataVF[2].data.push(parseFloat(data.power));

      this.lineChartLabelF.push(data.timestamp);

      this.object = {
        dataA: this.lineChartDataAF,
        dataV: this.lineChartDataVF,
        label: this.lineChartLabelF
      }
      this.$graphFResponseSource.next(this.object)
    }
  }
  x: {
    A: [],
    V: [],
    Label: []
  }

  private removeLastElementFromChartDataAndLabel(topic): void {
    if (topic == 'pibpump/a') {
      this.lineChartDataVA[0].data = this.lineChartDataVA[0].data.slice(1);
      this.lineChartDataVA[1].data = this.lineChartDataVA[1].data.slice(1);
      this.lineChartDataVA[2].data = this.lineChartDataVA[2].data.slice(1);

      this.lineChartDataAA[0].data = this.lineChartDataAA[0].data.slice(1);
      this.lineChartDataAA[1].data = this.lineChartDataAA[1].data.slice(1);
      this.lineChartDataAA[2].data = this.lineChartDataAA[2].data.slice(1);

      this.lineChartLabelA = this.lineChartLabelA.slice(1);
    }
    if (topic == 'pibpump/b') {
      this.lineChartDataVB[0].data = this.lineChartDataVB[0].data.slice(1);
      this.lineChartDataVB[1].data = this.lineChartDataVB[1].data.slice(1);
      this.lineChartDataVB[2].data = this.lineChartDataVB[2].data.slice(1);

      this.lineChartDataAB[0].data = this.lineChartDataAB[0].data.slice(1);
      this.lineChartDataAB[1].data = this.lineChartDataAB[1].data.slice(1);
      this.lineChartDataAB[2].data = this.lineChartDataAB[2].data.slice(1);

      this.lineChartLabelB = this.lineChartLabelB.slice(1);
    }
    if (topic == 'pibpump/c') {
      this.lineChartDataVC[0].data = this.lineChartDataVC[0].data.slice(1);
      this.lineChartDataVC[1].data = this.lineChartDataVC[1].data.slice(1);
      this.lineChartDataVC[2].data = this.lineChartDataVC[2].data.slice(1);

      this.lineChartDataAC[0].data = this.lineChartDataAC[0].data.slice(1);
      this.lineChartDataAC[1].data = this.lineChartDataAC[1].data.slice(1);
      this.lineChartDataAC[2].data = this.lineChartDataAC[2].data.slice(1);

      this.lineChartLabelC = this.lineChartLabelC.slice(1);
    }
    if (topic == 'pibpump/d') {
      this.lineChartDataVD[0].data = this.lineChartDataVD[0].data.slice(1);
      this.lineChartDataVD[1].data = this.lineChartDataVD[1].data.slice(1);
      this.lineChartDataVD[2].data = this.lineChartDataVD[2].data.slice(1);

      this.lineChartDataAD[0].data = this.lineChartDataAD[0].data.slice(1);
      this.lineChartDataAD[1].data = this.lineChartDataAD[1].data.slice(1);
      this.lineChartDataAD[2].data = this.lineChartDataAD[2].data.slice(1);

      this.lineChartLabelD = this.lineChartLabelD.slice(1);
    }
    if (topic == 'pibpump/e') {
      this.lineChartDataVE[0].data = this.lineChartDataVE[0].data.slice(1);
      this.lineChartDataVE[1].data = this.lineChartDataVE[1].data.slice(1);
      this.lineChartDataVE[2].data = this.lineChartDataVE[2].data.slice(1);

      this.lineChartDataAE[0].data = this.lineChartDataAE[0].data.slice(1);
      this.lineChartDataAE[1].data = this.lineChartDataAE[1].data.slice(1);
      this.lineChartDataAE[2].data = this.lineChartDataAE[2].data.slice(1);

      this.lineChartLabelE = this.lineChartLabelE.slice(1);
    }
    if (topic == 'pibpump/f') {
      this.lineChartDataVF[0].data = this.lineChartDataVF[0].data.slice(1);
      this.lineChartDataVF[1].data = this.lineChartDataVF[1].data.slice(1);
      this.lineChartDataVF[2].data = this.lineChartDataVF[2].data.slice(1);

      this.lineChartDataAF[0].data = this.lineChartDataAF[0].data.slice(1);
      this.lineChartDataAF[1].data = this.lineChartDataAF[1].data.slice(1);
      this.lineChartDataAF[2].data = this.lineChartDataAF[2].data.slice(1);

      this.lineChartLabelF = this.lineChartLabelF.slice(1);
    }

  }
  private isChartDataFull(chartData: ChartDataSets[], limit: number): boolean {
    return chartData[0].data.length >= limit;
  }

  lineChartDataAA: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVA: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];

  lineChartDataAB: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVB: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];

  lineChartDataAC: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVC: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];

  lineChartDataAD: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVD: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];

  lineChartDataAE: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVE: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  //E stop

  //F
  lineChartDataAF: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  lineChartDataVF: ChartDataSets[] = [
    { data: [], label: "Phase 1", fill: false },
    { data: [], label: "Phase 2", fill: false },
    { data: [], label: "Phase 3", fill: false }

  ];
  //F stop

  lineChartLabelA: Label[] = [];
  lineChartLabelB: Label[] = [];
  lineChartLabelC: Label[] = [];
  lineChartLabelD: Label[] = [];
  lineChartLabelE: Label[] = [];
  lineChartLabelF: Label[] = [];

}