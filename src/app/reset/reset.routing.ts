import { Routes, RouterModule }  from '@angular/router';

import { ResetComponent } from './reset.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ResetComponent
  }
];

export const routing = RouterModule.forChild(routes);
