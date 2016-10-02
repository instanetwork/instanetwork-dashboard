import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Subscription } from './subscription.component.ts';
import { routing }       from './subscription.routing.ts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Subscription
  ],
  providers: [
  ]
})
export default class DashboardModule {}
