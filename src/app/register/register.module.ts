import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../theme/nga.module';
import {BrowserModule}  from '@angular/platform-browser';
import {AuthenticationService} from '../_services/index';
import {EmailService} from '../_services/email.service';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {routing}       from './register.routing';

import {RegisterComponent} from './register.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    BrowserModule,
    routing,
    ReCaptchaModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  providers: [
    AuthenticationService,
    EmailService,
  ]
})

export class RegisterModule {
}
