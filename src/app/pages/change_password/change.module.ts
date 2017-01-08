import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {AuthenticationService} from '../../_services/index';

import {routing}       from './change.routing';

import {Change} from './change.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    ReCaptchaModule,
  ],
  declarations: [
    Change,
  ],
  providers: [
    AuthenticationService,
  ]
})

export default class ChangeModule {
}
