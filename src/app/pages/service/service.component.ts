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
  private inputInvalid: boolean = false;
  private allowedTagCharacters = new RegExp('[^A-Za-z0-9]');

  constructor() {
    this.hashtags.push("Love");
    this.hashtags.push("Smile");
    this.hashtags.push("Laugh");
    this.hashtags.push("Happy");
    this.hashtags.push("Life");
  }

  private addHashtag() {
    if (this.inputInvalid == false && this.inputValue.length !== 0) {
      this.hashtags.unshift(this.inputValue);
      this.inputValue = "";
    }
  }

  newItemChanged(event: KeyboardEvent): void {
    const target = <HTMLInputElement> event.target;
    this.inputValue = target.value;
    this.inputInvalid = this.allowedTagCharacters.test(this.inputValue);
  }
}
