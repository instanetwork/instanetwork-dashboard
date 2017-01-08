import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard } from '../_guards/index';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') , canActivate: [AuthGuard]},
      { path: 'subscription', loadChildren: () => System.import('./subscription/subscription.module'), canActivate: [AuthGuard] },
      { path: 'service', loadChildren: () => System.import('./service/service.module'), canActivate: [AuthGuard] },
      { path: 'change', loadChildren: () => System.import('./change_password/change.module'), canActivate: [AuthGuard] },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
