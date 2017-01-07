import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../theme/nga.module';
import {BrowserModule}  from '@angular/platform-browser';
import {AuthenticationService} from '../_services/index';

import {Register} from './register.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    BrowserModule,
    routing,
  ],
  declarations: [
    Register
  ],
  providers: [
    AuthenticationService
  ]
})
export default class RegisterModule {
}
