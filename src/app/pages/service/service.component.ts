import {Component, ViewContainerRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {HashtagService} from '../../_services/hashtag.service';
import {InstagramAuthenticationService} from '../../_services/instagram.authentication.service';
import {ProfileService} from '../../_services/profile.service';

import {Hashtag} from '../../_models/hashtag';
import {Profile} from '../../_models/profile';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'service',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./service.scss')],
  template: require('./service.html')
})
export class Service {
  @ViewChild('modal')
  modalLogin: ModalComponent;

  @ViewChild('modalStoping')
  modalStoping: ModalComponent;

  @ViewChild('modalStarting')
  modalStarting: ModalComponent;

  public tags: Hashtag[];
  private hashtags: string[] = [];
  private inputValue: string = "";
  private inputInvalid: boolean = false;
  private allowedTagCharacters = new RegExp('[^A-Za-z0-9]');
  private error: string = "";
  private loginError: string = "";
  private lastHighlightedTag: string = "";
  private maxHashtags: number = 50;
  private instaUsername: string = "";
  private instaPassword: string = "";
  private loading: boolean = false;
  private profile: Profile[];
  private activeService: number = 0;

  constructor(private hashtagService: HashtagService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private instagramAuthenticationService: InstagramAuthenticationService, private profileService: ProfileService) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.hashtagService.getHashtags()
      .subscribe(tags => {
        this.tags = this.setHashtags(tags);
      });
    this.profileService.getProfile()
      .subscribe(profile => {
        var lastStartUnix = new Date(profile[0].laststart).valueOf();
        var lastStopUnix = new Date(profile[0].lastran).valueOf();
        var currentTimeUnix = new Date().valueOf();
        var diffStart = currentTimeUnix - lastStartUnix;
        var diffStop = currentTimeUnix - lastStopUnix;
        console.log(diffStart);
        console.log(diffStop);
        if (diffStart < 60000) {
          this.onWaiting(this.modalStarting, profile, diffStart, 'Instanetwork Service Start Confirmed');
        } else if (diffStop < 60000) {
          this.onWaiting(this.modalStoping, profile, diffStop, 'Instanetwork Service Stop Confirmed');
        } else {
          this.profile = profile;
          this.activeService = this.profile[0].active;
        }
      });
  }

  private setHashtags(_tags: Hashtag[]) {
    if (_tags.length == 0) {
      this.hashtags.push("love");
      this.hashtags.push("smile");
      this.hashtags.push("laugh");
      this.hashtags.push("happy");
      this.hashtags.push("life");
      return _tags;
    }

    for (var _i = 0; _i < _tags.length; _i++) {
      this.hashtags.push(_tags[_i].tag.toLowerCase());
    }

    return _tags;
  }

  addHashtag() {
    if (this.inputInvalid == false && this.inputValue.length !== 0 && this.hashtags.length < this.maxHashtags) {
      for (var _i = 0; _i < this.hashtags.length; _i++) {
        if (this.hashtags[_i].toLowerCase() == this.inputValue.toLowerCase()) {
          this.error = "No Duplicate Hashtags Allowed";
          this.inputInvalid = true;
          return false;
        }
      }
      this.hashtags.unshift(this.inputValue.toLowerCase());
      this.inputValue = "";
      this.error = "";
      return true;
    }
  }

  newItemChanged(event: KeyboardEvent): void {
    const target = <HTMLInputElement> event.target;
    this.inputValue = target.value;
    this.inputInvalid = this.allowedTagCharacters.test(this.inputValue);
    if (this.inputInvalid) {
      this.error = "No Special Characters Allowed";
    } else {
      this.error = "";
    }
    if (event.keyCode == 13) {
      this.addHashtag();
    }
  }

  deleteKeyClicked(event) {
    var key = event.keyCode || event.charCode;

    if (key != 8 && key != 46)
      return false;

    this.deleteHashtag();
  }

  deleteHashtag() {
    for (var _i = 0; _i < this.hashtags.length; _i++) {
      if (this.hashtags[_i].toLowerCase() == this.lastHighlightedTag.toLowerCase()) {
        this.hashtags.splice(_i, 1);
      }
    }
  }

  highlightedTag(tag) {
    this.lastHighlightedTag = tag;
  }

  onDelete() {
    this.deleteHashtag();
  }

  onSave() {
    var test = this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Are you sure you want to save hashtags?')
      .body('These hashtags will take affect during shutdown time between 12-1 am/pm Est. You can save your hashtags and use them immediately by starting or restarting the service.')
      .okBtn('Save')
      .okBtnClass('btn btn-success')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-danger')
      .open()
      .then(dialog => dialog.result)
      .then(result => {
        this.onSaveConfirmed();
      })
      .catch((ex) => {
      });
  }

  onSaveConfirmed() {
    this.hashtagService.setHashtags(this.hashtags)
      .subscribe(res => {
          this.modal.alert()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Completed')
            .titleHtml('Hashtags Upload Complete')
            .okBtnClass('btn btn-success')
            .body('Your hashtags have been updated.')
            .open();
        },
        err => {
          this.modal.alert()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Failed')
            .titleHtml('Hashtags Upload Failed')
            .okBtnClass('btn btn-danger')
            .body('Unable to save hashtags, please try again later.')
            .open();
        });
  }

  onCancelledClicked() {
    console.log(this.loading);
    if (this.loading) {
      return
    }
    this.modalLogin.dismiss();
  }

  onStartClicked() {
    if (this.loading) {
      return;
    }

    this.loginError = "";
    this.loading = true;
    console.log("hey " + this.instaUsername + " " + this.instaPassword);
    this.instagramAuthenticationService.validateInstagramUser(this.instaUsername, this.instaPassword, '172.102.218.184', '58665', 'instanetwork', 'B1keQVsz')
      .subscribe(result => {
          if (result.content) {
            this.loginError = "";
            this.modalLogin.dismiss();
            this.onStartConfirmed();
          }
          else {
            this.loginError = "Unable to login, please try again or visit instagram.com and verify login";
          }
          this.loading = false;
        },
        (err) => {
          this.loginError = "Something went wrong, please try again later";
          this.loading = false;
        }
      );
  }

  onStopService() {
    var test = this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Instanetwork Service')
      .body('Are you sure you want to stop the Instanetwork service?')
      .okBtn('Okay')
      .okBtnClass('btn btn-success')
      .cancelBtn('Cancel')
      .cancelBtnClass('btn btn-danger')
      .open()
      .then(dialog => dialog.result)
      .then(result => {
        this.onStopConfirmed();
      })
      .catch((ex) => {
      });
  }

  onStopConfirmed() {
    this.profileService.stopService()
      .subscribe(res => {
          this.onWaiting(this.modalStoping, res,60000, 'Instanetwork Service Stop Confirmed');
        },
        err => {
          this.modal.alert()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Failed')
            .titleHtml('Instanetwork Service Stop Failed')
            .okBtnClass('btn btn-danger')
            .body('Unable to stop service, please try again later.')
            .open();
        });
  }

  onStartConfirmed() {
    this.profileService.startService(this.hashtags, this.instaUsername, this.instaPassword, '192.168.1.1')
      .subscribe(res => {
          this.onWaiting(this.modalStarting, res,60000, 'Instanetwork Service Start Confirmed');
        },
        err => {
          this.modal.alert()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Failed')
            .titleHtml('Instanetwork Service Start Failed')
            .okBtnClass('btn btn-danger')
            .body('Unable to start service, please try again later.')
            .open();
        });
  }

  onWaiting(modal, profile, waitMilli, body){
    modal.open();
    setTimeout(()=> {
      modal.dismiss();
      this.profile = profile;
      this.activeService = profile[0].active;
      this.modal.alert()
        .size('sm')
        .isBlocking(true)
        .showClose(true)
        .keyboard(27)
        .title('Completed')
        .titleHtml('Instanetwork Service')
        .okBtnClass('btn btn-success')
        .body(body)
        .open();
    }, waitMilli)
  }
}
