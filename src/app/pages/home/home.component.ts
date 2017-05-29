import {Component, ViewEncapsulation, Renderer, ViewContainerRef} from '@angular/core';
import {SubscriptionService} from '../../_services/subscription.service';
import 'rxjs/Rx';
import {Subscription} from '../../_models/subscription';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./home.scss')],
  template: require('./home.html'),
})
export class Home {
  public subs: Subscription[];
  private currDate: number;
  private trial: boolean;
  private subExists: boolean;
  private trialClicked: boolean;

  constructor(private renderer: Renderer, private subscriptionService: SubscriptionService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    this.trial = false;
    this.subExists = false;
    this.trialClicked = false;
    var now = new Date();
    this.currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
  }

  ngOnInit() {
    this.subscriptionService.getEntries()
      .subscribe(subs => {
        this.subs = this.formatJson(subs);
        if (!this.subs || this.subs.length == 0) {
          this.subscriptionService.addTrial()
            .subscribe(subs => {
              this.subs = this.formatJson(subs);
              
              this.modal.alert()
                .size('lg')
                .isBlocking(true)
                .showClose(true)
                .keyboard(27)
                .title('Completed')
                .titleHtml('Instanetwork Subscription')
                .okBtnClass('btn btn-success')
                .body('Welcome to Instanetwork! Your trial has automatically started but you still need to connect to your Instagram account. Please navigate to the dashboard page, enter your targeted hashtags and hit start service.')
                .open();
            });
        }
      });
  }

  private formatJson(_subs: Subscription[]) {

    if (_subs.length == 0) {
      return _subs;
    }

    for (var _i = 0; _i < _subs.length; _i++) {
      _subs[_i].start = new Date(_subs[_i].start).valueOf();
      _subs[_i].end = new Date(_subs[_i].end).valueOf();
    }

    this.subExists = true;
    this.trial = false;
    return _subs;
  }

}
