import { Routes, RouterModule }  from '@angular/router';

import { Service } from './service.component.ts';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Service,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
