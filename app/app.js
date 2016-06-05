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

    window.odometerOptions = {
      auto: false, // Don't automatically initialize everything with class 'odometer'
      selector: '.my-numbers', // Change the selector used to automatically find things to be animated
      format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
      duration: 3000, // Change how long the javascript expects the CSS animation to take
      theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
      animation: 'count' // Count is a simpler animation method which just increments the value,
                         // use it when you're looking for something more subtle.
    };

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
