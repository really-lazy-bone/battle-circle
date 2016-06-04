import {App, Platform, NavController, NavParams} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {EventsPage} from './pages/events/events';


@App({
  template: '<ion-nav [root]="rootPage" #content></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform, nav, navParams) {
    this.rootPage = EventsPage;

    console.log(platform);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
