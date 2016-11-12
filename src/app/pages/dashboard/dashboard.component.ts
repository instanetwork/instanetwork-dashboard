import {Component, ViewEncapsulation} from '@angular/core';
import {SubscriptionService} from '../../_services/subscription.service';
import 'rxjs/Rx';
import {Subscription} from '../../_models/subscription';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html'),
})
export class Dashboard {
  public subs: Subscription[];
  private currDate: number;
  private trial: boolean;
  private subExists: boolean;
  private trialClicked: boolean;

  constructor(private subscriptionService: SubscriptionService) {
    this.trial = false;
    this.subExists = false;
    this.trialClicked = false;
    this.currDate = new Date().setUTCHours(4);
  }

  ngOnInit() {
    this.subscriptionService.getEntries()
      .subscribe(subs => {
        this.subs = this.formatJson(subs);
      });
  }

  private formatJson(_subs: Subscription[]) {

    if (_subs.length == 0) {
      this.trial = true;
      this.subExists = false;
      return _subs;
    }

    for (var _i = 0; _i < _subs.length; _i++) {
      _subs[_i].start = new Date(_subs[_i].start).setUTCHours(4);
      _subs[_i].end = new Date(_subs[_i].end).setUTCHours(4);
    }

    this.subExists = true;
    this.trial = false;
    return _subs;
  }

  private addTrial() {
    this.trialClicked = true;
    console.log("test");
  }
}
