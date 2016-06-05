import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/video/video.html'
})
export class VideoPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {

  }
}
