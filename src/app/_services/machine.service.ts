import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MachineService {
  constructor(private http: HttpClient) {}

  getTableData(machinename: string): Observable<[]> {
    return this.http.get<[]>(
      "http://localhost:4000/machine/graph" + machinename
    );
  }
  getGraphData(machinename: string): Observable<[]> {
    return this.http.get<[]>("http://localhost:4000/machine/" + machinename);
  }
}
