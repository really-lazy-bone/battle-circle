import {Page, NavController, NavParams} from 'ionic-angular';

import {ControlPage} from '../control/control';
import {VideoPage} from '../video/video';
import {SelfiePage} from '../selfie/selfie';

@Page({
  templateUrl: 'build/pages/contest/contest.html'
})
export class ContestPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    var self = this;
    self.admin = true;
    self.nav = nav;
    this.data = params.get('item');
    self._reComputeTotalCount();
    self.ws = new WebSocket('wss://run-east.att.io/158fd3a56b011/5c289c9afc2b/331c3dc7eb0a9b6/in/flow/ws/vote');
    self.pairs = self._splitPair(this.data.contestents);

    self.ws.onmessage = function(evt) {
      var allVotes = JSON.parse(evt.data);
      // hack to get if it is result or not
      if (allVotes.length === 1) {
        // display winner
        self.displayWinner(allVotes);
      } else {
        allVotes.forEach(updatedVote => {
          self.data.contestents.forEach(contestent => {
            if (contestent.id === updatedVote._id) {
              contestent.vote = updatedVote.count;
            }
          });
        });
        console.log(allVotes);
        self._reComputeTotalCount();
        self._redrawVote.bind(self)();
      }
    };
    self.ws.onopen = function() {
      console.debug('getting initial state');
      self.ws.send(JSON.stringify({id: -2}));
    };

    setTimeout(function() { self._redrawVote.bind(self)(true); }, 500);
    setTimeout(function() { self._initOdometer.bind(self)(); }, 500);
  }

  getIconClass(contestent) {
    var className = 'ion-ios-arrow-up'
    if (!this.voted) {
      return className;
    } else if (this.voted === contestent.id) {
      return className + ' voted';
    } else {
      return className + ' inactive';
    }
  }

  /**
   * special ids
   * 0  - reset
   * -1 - end contest
   * -2 - get current state
   */
  vote(contestent) {
    if (this.data.img === 'imgs/att_roc.jpg' && !this.voted && !this.ended) {
      this.voted = contestent.id;
      this.ws.send(JSON.stringify({id: contestent.id}));
    }
  }

  toControl(item) {
    var self = this;
    if (self.admin) {
      this.nav.push(ControlPage, {
        item: self.data
      });
    }
  }

  displayWinner(data) {
    console.debug('displaying winner');
    console.debug(data);
    var self = this;
    var winner = this.data.contestents
      .filter(contestent => contestent.id === data[0]._id)[0];
    winner.win = true;
    this.ended = true;
    setTimeout(function() {
      self.nav.push(SelfiePage, {});
    }, 3000);
  }

  getTitle() {
    return (this.ended) ? '🎉 Winner 🎉' : (!this.voted) ? 'Vote below 👇' : 'Thanks! 😉';
  }

  shouldHide(contestent) {
    return !(!this.ended || contestent.win);
  }

  getTitleClass() {
    return (this.ended) ? 'winner animated tada center just-as-usual' : 'center just-as-usual';
  }

  toVideo() {
    if (this.admin) {
      this.nav.push(VideoPage, {});
    }
  }

  _initOdometer() {
    var self = this;
    var odometerContainers = document.querySelectorAll('.up-vote .odometer-container');

    for (var i = 0; i < odometerContainers.length; i ++) {
      var id = odometerContainers[i].getAttribute('id');
      var contestent = self.data.contestents
        .filter(contestent => contestent.id === parseInt(id))[0];
      if (!contestent) return;

      contestent.od = new Odometer({
        el: odometerContainers[i],
        value: 0,

        // Any option (other than auto and selector) can be passed in here
        format: 'dd%',
        theme: 'minimal'
      });

      contestent.od.update(parseInt(contestent.votePercentage * 100));
    }
  }

  _reComputeTotalCount() {
    var self = this;
    var totalVote = this.data.contestents
      .map(contestent => contestent.vote)
      .reduce((total, vote) => total + vote, 0);
    self.data.contestents = self.data.contestents.map(contestent => {
      contestent.votePercentage = (totalVote) ? contestent.vote / totalVote : 0;
      if (contestent.od) {
        contestent.od.update(parseInt(contestent.votePercentage * 100));
      }

      return contestent;
    });
  }

  _redrawVote(init) {
    var self = this;
    var containers = document.querySelectorAll('.contestent .container');

    for (var i = 0; i < containers.length; i ++) {
      var id = containers[i].getAttribute('id');
      var contestent = self.data.contestents
        .filter(contestent => contestent.id === parseInt(id))[0];
      if (!contestent) return;
      var initialized = contestent.progressBar;
      if (init || !contestent.progressBar) {
        var bar = new ProgressBar.Circle(containers[i], {
          strokeWidth: 5,
          easing: 'bounce',
          duration: 1400,
          color: '#00f9b2',
          trailColor: 'rgb(240, 240, 240)',
          trailWidth: 5,
          svgStyle: null
        });
        contestent.progressBar = bar;
      }

      contestent.progressBar.animate(contestent.votePercentage);
    }
  }

  _splitPair(arr) {
    var pairs = [];
    for (var i=0 ; i<arr.length ; i+=2) {
      if (arr[i+1] !== undefined) {
        pairs.push ([arr[i], arr[i+1]]);
      } else {
        pairs.push ([arr[i]]);
      }
    }
    return pairs;
  }
}
