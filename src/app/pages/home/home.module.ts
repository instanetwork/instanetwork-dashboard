import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {HttpModule} from '@angular/http';
import {SubscriptionService} from '../../_services/subscription.service';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';

import {Home} from './home.component';
import {routing}       from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
  ],
  declarations: [
    Home
  ],
  providers: [
    SubscriptionService
  ]
})
export default class HomeModule {
}
