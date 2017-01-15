import {Component, ViewChild, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EqualPasswordsValidator} from '../../theme/validators';
import {UserService} from '../../_services/user.service';
import {ReCaptchaComponent} from 'angular2-recaptcha/lib/captcha.component';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./change.scss')],
  template: require('./change.html'),
})
export class Change {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  public form: FormGroup;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  private error: string = '';
  private loading: boolean = false;
  public submitted: boolean = false;

  constructor(private router: Router, fb: FormBuilder, private userService: UserService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values: Object): void {
    if (this.form.valid && this.captcha.getResponse()) {
      this.error = '';
      this.loading = true;
      this.submitted = true;
      this.userService.changePassword(values['passwords']['password']).subscribe(result => {
          if (result === true) {
            this.captcha.reset();
            this.loading = false;
            this.modal.alert()
              .size('sm')
              .isBlocking(true)
              .showClose(true)
              .keyboard(27)
              .title('Completed')
              .titleHtml('Instanetwork Service')
              .okBtnClass('btn btn-success')
              .body('Password Successfully Changed')
              .open()
              .then(dialog => dialog.result)
              .then(result => {
                this.router.navigate(['/pages/home']);
              })
              .catch((ex) => {
              });
          } else {
            this.captcha.reset();
            this.error = 'Unable to change password, please try again later';
            this.loading = false;
          }
        },
        (err) => {
          this.captcha.reset();
          this.error = 'Unable to change password, please try again later';
          this.loading = false;
        }
      );
    }
  }
}
