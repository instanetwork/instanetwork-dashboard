import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {HashtagService} from '../../_services/hashtag.service';
import {Hashtag} from '../../_models/hashtag';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';

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
  private lastHighlightedTag: string = "";

  constructor(private hashtagService: HashtagService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
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

  addHashtag() {
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

  deleteKeyClicked(event) {
    var key = event.keyCode || event.charCode;

    if( key != 8 && key != 46 )
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
    var test = this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Save')
      .titleHtml('Are you sure you want to save hashtags?')
      .body('These hashtags will take affect during shutdown time between 12-1 am/pm Est. You can save your hashtags and use them immediately by starting or restarting the service.')
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
}
