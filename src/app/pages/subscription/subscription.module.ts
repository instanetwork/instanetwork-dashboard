import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { Subscription } from './subscription.component.ts';
import { routing }       from './subscription.routing.ts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DropdownModule,
    ModalModule,
  ],
  declarations: [
    Subscription
  ],
  providers: [
  ]
})
export default class DashboardModule {}
