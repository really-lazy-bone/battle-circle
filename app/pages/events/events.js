import {Page, NavController} from 'ionic-angular';
import {ContestPage} from '../contest/contest';
import {ControlPage} from '../control/control';

@Page({
  templateUrl: 'build/pages/events/events.html'
})
export class EventsPage {
  static get parameters() {
    return [[NavController]];
  }
  
  constructor(nav) {
    this.nav = nav;
  }
  
  toContest() {
    this.nav.push(ContestPage, {});
  }
  
  toControl() {
    this.nav.push(ControlPage, {});
  }
}
