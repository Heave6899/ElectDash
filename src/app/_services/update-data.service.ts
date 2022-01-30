import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MachineService } from './machine.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private machineService: MachineService) { }
  graphData = new ReplaySubject(1)
  lastUpdatedAt = new ReplaySubject<number>(1)
  setService() {
    console.log("service started")
    setInterval(() => { let graphpoints = this.graphDataPoints(); this.graphData.next(graphpoints); localStorage.setItem('lastUpdatedAt', Date.now().toString()); }, 300000)
    // setInterval(() => { this.lastUpdatedAt.next(parseInt(localStorage.getItem("lastUpdatedAt"))); }, 1000)
  }

  graphDataPoints() {
    let listOfMachines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let graphData: any = [];
    listOfMachines.forEach(
      x => {
        var jsonData = { "machinename": x, "skip": 0, "limit": 20 };
        this.machineService.getGraphData(btoa(JSON.stringify(jsonData))).subscribe(data => {
          graphData.push(data)
        });
      }
    );
    console.log('x', graphData)
    return graphData;
  }
}
