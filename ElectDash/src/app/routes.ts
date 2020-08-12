import { Routes } from '@angular/router';

import { SectionDashboardComponent } from './section-dashboard/section-dashboard.component';
import { MachaComponent } from './machdata/macha/macha.component'
export const appRoutes : Routes = [
    {path : 'dashboard', component: SectionDashboardComponent },
    {path : 'macha', component: MachaComponent },

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];