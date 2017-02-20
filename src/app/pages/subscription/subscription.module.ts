import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { UserService } from '../../_services/user.service';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import { Subscription } from './subscription.component.ts';
import { routing }       from './subscription.routing.ts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    ModalModule.forRoot(),
    BootstrapModalModule,
  ],
  declarations: [
    Subscription
  ],
  providers: [
    UserService
  ]
})
export default class SubscriptionModule {}
