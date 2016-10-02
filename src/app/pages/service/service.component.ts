import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'service',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./service.scss')],
  template: require('./service.html')
})
export class Service {

  constructor() {
  }

}
