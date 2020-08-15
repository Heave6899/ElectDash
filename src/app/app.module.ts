import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';


import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SectionDashboardComponent } from './section-dashboard/section-dashboard.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MachaComponent } from './machdata/macha/macha.component';
import { LinechartVAComponent } from './machdata/macha/linechart-va/linechart-va.component';
import { LinechartVBComponent } from './machdata/machb/linechart-vb/linechart-vb.component';
import { LinechartVCComponent } from './machdata/machc/linechart-vc/linechart-vc.component';
import { LinechartVDComponent } from './machdata/machd/linechart-vd/linechart-vd.component';
import { LinechartVEComponent } from './machdata/mache/linechart-ve/linechart-ve.component';
import { LinechartVFComponent } from './machdata/machf/linechart-vf/linechart-vf.component';
import { MachbComponent } from './machdata/machb/machb.component';
import { MachcComponent } from './machdata/machc/machc.component';
import { MachdComponent } from './machdata/machd/machd.component';
import { MacheComponent } from './machdata/mache/mache.component';
import { MachfComponent } from './machdata/machf/machf.component';
import { SseService } from './sse.service';
import { LinechartAAComponent } from './machdata/macha/linechart-aa/linechart-aa.component';
import { LinechartABComponent } from './machdata/machb/linechart-ab/linechart-ab.component';
import { LinechartACComponent } from './machdata/machc/linechart-ac/linechart-ac.component';
import { LinechartADComponent } from './machdata/machd/linechart-ad/linechart-ad.component';
import { LinechartAEComponent } from './machdata/mache/linechart-ae/linechart-ae.component';
import { LinechartAFComponent } from './machdata/machf/linechart-af/linechart-af.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BarChartComponent,
    LineChartComponent,
    MachaComponent,
    SectionDashboardComponent,
    LinechartVAComponent,
    LinechartVBComponent,
    LinechartVCComponent,
    LinechartVDComponent,
    LinechartVEComponent,
    LinechartVFComponent,
    MachbComponent,
    MachcComponent,
    MachdComponent,
    MacheComponent,
    MachfComponent,
    LinechartAAComponent,
    LinechartABComponent,
    LinechartACComponent,
    LinechartADComponent,
    LinechartAEComponent,
    LinechartAFComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [SseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
