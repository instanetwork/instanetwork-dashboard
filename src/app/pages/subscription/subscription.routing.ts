import { Routes, RouterModule }  from '@angular/router';

import { Subscription } from './subscription.component.ts';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Subscription,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
