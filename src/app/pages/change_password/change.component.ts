import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../change_password/index';
import {ReCaptchaComponent} from 'angular2-recaptcha/lib/captcha.component';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./change.scss')],
  template: require('./change.html'),
})
export class Change {

  @ViewChild(ReCaptchaComponent) captcha:ReCaptchaComponent;

  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords: FormGroup;
  private error: string = '';
  private loading: boolean = false;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {

    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      })
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.error = '';
    this.loading = true;
    this.submitted = true;
    if (this.form.valid) {
       console.log(values);
    }
  }
}
