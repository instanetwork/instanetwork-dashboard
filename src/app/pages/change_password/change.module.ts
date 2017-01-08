import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {UserService} from '../../_services/user.service';
import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
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
    ModalModule.forRoot(),
    BootstrapModalModule,
  ],
  declarations: [
    Change,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [
    Change
  ]
})

export default class ChangeModule {
}
