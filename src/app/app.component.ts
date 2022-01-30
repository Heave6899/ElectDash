import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoaderService } from './_services/loader.service';
import { UpdateDataService } from './_services/update-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: Subject<boolean> = this.loader.isLoading;
  showLoader: boolean = true;

  constructor(private loader: LoaderService, private router: Router, private spinner: NgxSpinnerService) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouteChange(routerEvent);
    });

  };
  ngOnInit() {
  }
  checkRouteChange(routerEvent: RouterEvent) {

    // if route change started
    if (routerEvent instanceof NavigationStart) {

      this.spinner.show()
    }
    // if route change ended
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.spinner.hide()
    }
  }
}
