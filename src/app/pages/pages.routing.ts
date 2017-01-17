import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard } from '../_guards/index';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => System.import('./home/home.module.ts') , canActivate: [AuthGuard]},
      { path: 'subscription', loadChildren: () => System.import('./subscription/subscription.module'), canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module.ts'), canActivate: [AuthGuard] },
      { path: 'change', loadChildren: () => System.import('./change_password/change.module'), canActivate: [AuthGuard] },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
