import { Routes } from '@angular/router';

import { SectionDashboardComponent } from './section-dashboard/section-dashboard.component';
import { MachaComponent } from './machdata/macha/macha.component'
import { MachbComponent } from './machdata/machb/machb.component'
import { MachcComponent } from './machdata/machc/machc.component'
import { MachdComponent } from './machdata/machd/machd.component'
import { MacheComponent } from './machdata/mache/mache.component'
import { MachfComponent } from './machdata/machf/machf.component'

export const appRoutes: Routes = [
    { path: 'dashboard', component: SectionDashboardComponent },
    { path: 'macha', component: MachaComponent },
    { path: 'machb', component: MachbComponent },
    { path: 'machc', component: MachcComponent },
    { path: 'machd', component: MachdComponent },
    { path: 'mache', component: MacheComponent },
    { path: 'machf', component: MachfComponent },


    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];