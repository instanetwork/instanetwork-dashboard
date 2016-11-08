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
  private subs: Subscription[];

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit() {
    this.subscriptionService.getEntries()
      .subscribe(subs => {
        this.subs = subs
      });
  }
}
