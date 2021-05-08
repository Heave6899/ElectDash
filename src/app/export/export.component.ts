import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { User } from "app/_models/user";
import { AuthenticationService } from "app/_services/authentication.service";
import { MachineService } from "app/_services/machine.service";

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.css"],
})
export class ExportComponent implements OnInit {
  user: User;
  constructor(
    authService: AuthenticationService,
    private machineService: MachineService,
    private route: ActivatedRoute,
    private router: Route
  ) {
    authService.currentUser.subscribe((x) => (this.user = x));
  }
  machinename: string;
  machinedata;
  async ngOnInit() {
    this.route.snapshot.paramMap.get("machinename");
    this.machinedata = await this.machineService.getTableData(this.machinename);
  }
}
