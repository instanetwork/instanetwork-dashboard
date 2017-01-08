import { Routes, RouterModule }  from '@angular/router';

import { Change } from './change.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Change,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
