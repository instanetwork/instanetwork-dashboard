import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'service',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./service.scss')],
  template: require('./service.html')
})
export class Service {
  private hashtags: string[] = [];
  private inputValue: string = "";
  private inputValid: boolean = false;
  constructor() {
    this.hashtags.push("Love");
    this.hashtags.push("Smile");
    this.hashtags.push("Laugh");
    this.hashtags.push("Happy");
    this.hashtags.push("Life");
  }

  private addHashtag() {
    this.hashtags.unshift(this.inputValue);
  }
  newItemChanged(event: KeyboardEvent): void {
    const target = <HTMLInputElement> event.target;
    this.inputValue = target.value;
  }
}
