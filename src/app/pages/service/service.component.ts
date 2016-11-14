import {Component, ViewEncapsulation} from '@angular/core';
import {HashtagService} from '../../_services/hashtag.service';
import {Hashtag} from '../../_models/hashtag';

@Component({
  selector: 'service',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./service.scss')],
  template: require('./service.html')
})
export class Service {
  public tags: Hashtag[];
  private hashtags: string[] = [];
  private inputValue: string = "";
  private inputInvalid: boolean = false;
  private allowedTagCharacters = new RegExp('[^A-Za-z0-9]');
  private error: string = "";

  constructor(private hashtagService: HashtagService) {
  }

  ngOnInit() {
    this.hashtagService.getHashtags()
      .subscribe(tags => {
        this.tags = this.setHashtags(tags);
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

  private addHashtag() {
    if (this.inputInvalid == false && this.inputValue.length !== 0) {
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
}
