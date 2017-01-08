import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./change.scss')],
  template: require('./change.html'),
})
export class Change {

  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;

  public submitted:boolean = false;

  constructor(fb:FormBuilder) {

    this.form = fb.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.password = this.form.controls['password'];
    this.repeatPassword = this.form.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
