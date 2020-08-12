import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { Paho } from 'ng2-mqtt/mqttws31';

@Injectable({
  providedIn: "root"
})
export class SseService {

  private subject = new BehaviorSubject<any>(undefined)

  getMessage(): Observable<any> {
    //console.log(this.$graphAResponseSource)
    return this.subject.asObservable();
  }
  // getMessageB(): Observable<any> {
  //   return this.$graphBResponseSource.asObservable();
  // }
  // getMessageC(): Observable<any> {
  //   return this.$graphCResponseSource.asObservable();
  // }
  // getMessageD(): Observable<any> {
  //   return this.$graphDResponseSource.asObservable();
  // }
  // getMessageE(): Observable<any> {
  //   return this.$graphEResponseSource.asObservable();
  // }
  // getMessageF(): Observable<any> {
  //   return this.$graphFResponseSource.asObservable();
  // }
  

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
  }


  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
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

  
    
    this.subject.next(this.message);
    //console.log(this.message)
    // if (this.message['topic'] == "pibpump/a") {
    //   this.$graphAResponseSource.next(this.message)
    //   console.log("ok1")
    //   //console.log(this.$graphAResponseSource.next(this.message))
    // }
    // if (this.message['topic'] == "pibpump/b") {
    //   this.$graphBResponseSource.next(this.message)
    //   console.log("ok2")
    // }
    // if (this.message['topic'] == "pibpump/c") {
    //   this.$graphCResponseSource.next(this.message)
    //   console.log("ok3")
    // }
    // if (this.message['topic'] == "pibpump/d") {
    //   this.$graphDResponseSource.next(this.message)
    //   console.log("ok3")
    // }
    // if (this.message['topic'] == "pibpump/e") {
    //   this.$graphEResponseSource.next(this.message)
    // }
    // if (this.message['topic'] == "pibpump/f") {
    //   this.$graphFResponseSource.next(this.message)
    // }
  };
}