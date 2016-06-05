import {Page, NavController} from 'ionic-angular';
import {ContestPage} from '../contest/contest';
import {EventsService} from '../../providers/events-service/events-service';

@Page({
  templateUrl: 'build/pages/events/events.html',
  providers: [EventsService]
})
export class EventsPage {
  static get parameters() {
    return [[NavController], [EventsService]];
  }

  constructor(nav, eventService) {
    this.nav = nav;

    this.events = eventService.getActiveEvents();
    this.pastEvents = eventService.getPastEvents();
  }

  toContest(item) {
    this.nav.push(ContestPage, {
      item: item
    });
  }
}
