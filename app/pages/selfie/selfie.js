import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/selfie/selfie.html'
})
export class SelfiePage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    var self = this;
    self.countdown = 3;
    self.counting = setInterval(function() {
      self.countdown --;
      if (self.countdown <= 0) {
        clearInterval(self.counting);
      }
    }, 1000);
  }
}
