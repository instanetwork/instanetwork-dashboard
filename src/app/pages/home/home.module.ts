import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {HttpModule} from '@angular/http';
import {SubscriptionService} from '../../_services/subscription.service';

import {Home} from './home.component';
import {routing}       from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule
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
