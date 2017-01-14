import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../theme/nga.module';
import {BrowserModule}  from '@angular/platform-browser';
import {AuthenticationService} from '../_services/index';
import {UserService} from '../_services/user.service';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {routing}       from './reset.routing';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';

import {ResetComponent} from './reset.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    BrowserModule,
    routing,
    ReCaptchaModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
  ],
  declarations: [
    ResetComponent,
  ],
  providers: [
    AuthenticationService,
    UserService,
  ],
  bootstrap: [
    ResetComponent
  ]
})

export class ResetModule {
}
