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
  private error: string = "";

  constructor() {
    this.hashtags.push("Love");
    this.hashtags.push("Smile");
    this.hashtags.push("Laugh");
    this.hashtags.push("Happy");
    this.hashtags.push("Life");
  }

  private addHashtag() {
    if (this.inputInvalid == false && this.inputValue.length !== 0) {
      for (var _i = 0; _i < this.hashtags.length; _i++) {
        if (this.hashtags[0] == this.inputValue) {
          this.error = "No Duplicate Hashtags Allowed";
          this.inputInvalid = true;
          return false;
        }
      }
      this.hashtags.unshift(this.inputValue);
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
}
