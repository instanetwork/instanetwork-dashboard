import {Component, ViewContainerRef, ViewEncapsulation, ViewChild} from '@angular/core';
import {HashtagService} from '../../_services/hashtag.service';
import {InstagramAuthenticationService} from '../../_services/instagram.authentication.service';
import {ProfileService} from '../../_services/profile.service';
import {SubscriptionService} from '../../_services/subscription.service';
import {IpService} from '../../_services/ip.service';
import {Router} from '@angular/router';

import {Hashtag} from '../../_models/hashtag';
import {Profile} from '../../_models/profile';
import {Ip} from '../../_models/ip';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'Dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
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
  private ipInfo: Ip;
  private active: boolean = false;

  constructor(private router: Router, private subscriptionService: SubscriptionService, private hashtagService: HashtagService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private instagramAuthenticationService: InstagramAuthenticationService, private profileService: ProfileService, private ipService: IpService) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.hashtagService.getHashtags()
      .subscribe(tags => {
        this.tags = this.setHashtags(tags);
      });
    this.profileService.getProfile()
      .subscribe(profile => {
        this.profile = profile;
        if (profile.length == 0) {
          return;
        }
        var lastStartUnix = new Date(profile[0].laststart).valueOf();
        var lastStopUnix = new Date(profile[0].lastran).valueOf();
        var currentTimeUnix = new Date().valueOf();
        var diffStart = currentTimeUnix - lastStartUnix;
        var diffStop = currentTimeUnix - lastStopUnix;
        if (diffStart < 60000) {
          this.onWaitingComplete(this.modalStarting, profile, diffStart, 'Instanetwork Service Started');
        } else if (diffStop < 60000) {
          this.onWaitingComplete(this.modalStoping, profile, diffStop, 'Instanetwork Service Stopped');
        } else {
          this.activeService = this.profile[0].active;
        }
      });
    this.subscriptionService.hasActive()
      .subscribe(active => {
       if(active) {
         this.active = true;
       } else {
         this.active = false;
         this.noSubscriptionAlert();
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
    if (!this.active)  {
      this.noSubscriptionAlert();
      return;
    }

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
    if (!this.active)  {
      this.noSubscriptionAlert();
      return;
    }

    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Are you sure you want to save these hashtags?')
      .body('These hashtags will take affect during our maintenance period between 12-1 AM/PM EST. Your hashtags can take affect immediately by starting or restarting your service.')
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
    if (this.loading) return;
    this.modalLogin.dismiss();
  }

  onStartClicked() {

    if (!this.active)  {
      this.noSubscriptionAlert();
      return;
    }

    if (this.loading) return;

    this.loginError = "";
    this.loading = true;

    var ip = this.profile.length > 0 ? this.profile[0].ip : false;

    if (!ip) {
      this.ipService.getLowestIp()
        .subscribe(result => {
            this.ipInfo = result;
            this.loginStartService();
          },
          (err) => {
            this.loginError = "Something went wrong, please try again later";
            this.loading = false;
            return;
          }
        );
    } else {
      this.ipService.getIpInfo(ip)
        .subscribe(result => {
            this.ipInfo = result;
            this.loginStartService();
          },
          (err) => {
            this.loginError = "Something went wrong, please try again later";
            this.loading = false;
            return;
          }
        );
    }
  }

  onStopService() {
    if (!this.active)  {
      this.noSubscriptionAlert();
      return;
    }

    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Instanetwork Service')
      .body('Are you sure you want to stop the Instanetwork dashboard?')
      .okBtn('Yes')
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
          this.onWaitingComplete(this.modalStoping, res, 60000, 'Instanetwork Service Stop Confirmed');
        },
        err => {
          this.onWaitingCompleteModal('btn btn-danger', 'Unable to stop dashboard, please try again later.');
        });
  }

  onStartConfirmed() {
    this.profileService.startService(this.hashtags, this.instaUsername, this.instaPassword, this.ipInfo.ip)
      .subscribe(res => {
          if (!this.profile[0].ip) {
            this.incrementIp(this.ipInfo.ip);
          }
          this.onWaitingComplete(this.modalStarting, res, 60000, 'Instanetwork Service Start Confirmed');
        },
        err => {
          this.onWaitingCompleteModal('btn btn-danger', 'Unable to start dashboard, please try again later.');
        });
  }

  onWaitingComplete(modal, profile, waitMilli, body) {
    modal.open();
    setTimeout(()=> {
      modal.dismiss();
      this.activeService = profile[0].active;
      this.onWaitingCompleteModal('btn btn-success', body);
    }, waitMilli)
  }

  onWaitingCompleteModal(btn, body) {
    this.modal.alert()
      .size('sm')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Completed')
      .titleHtml('Instanetwork Service')
      .okBtnClass(btn)
      .body(body)
      .open();
  }

  incrementIp(ip) {
    this.ipService.incrementIp(ip)
      .subscribe(res => {
        },
        err => {
        });
  }

  loginStartService() {
    this.instagramAuthenticationService.validateInstagramUser(this.instaUsername, this.instaPassword, this.ipInfo.ip, this.ipInfo.port, this.ipInfo.username, this.ipInfo.password)
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
    noSubscriptionAlert() {
      this.modal.alert()
        .size('sm')
        .isBlocking(true)
        .showClose(false)
        .keyboard(27)
        .title('Subscription')
        .titleHtml('No Subscription')
        .okBtnClass('btn btn-success')
        .body('You must have a subscription to access this page')
        .open()
        .then(dialog => dialog.result)
        .then(result => {
          this.router.navigate(['/pages/subscription']);
        })
        .catch((ex) => {
        });
    }
}
