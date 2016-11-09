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

  constructor(private subscriptionService: SubscriptionService) {
    this.currDate = new Date().setUTCHours(4);
  }

  ngOnInit() {
    this.subscriptionService.getEntries()
      .subscribe(subs => {
        this.subs = this.formatJson(subs);
      });
  }

  private formatJson (_subs: Subscription[]){
    for (var _i = 0; _i < _subs.length; _i++) {
       _subs[_i].start = new Date(_subs[_i].start).setUTCHours(4);
       _subs[_i].end = new Date(_subs[_i].end).setUTCHours(4);
    }
    return _subs;
  }
}
