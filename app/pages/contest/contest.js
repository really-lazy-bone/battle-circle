import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contest/contest.html'
})
export class ContestPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    var self = this;
    this.data = params.get('item');
    self._reComputeTotalCount();
    self.ws = new WebSocket('wss://run-east.att.io/158fd3a56b011/5c289c9afc2b/331c3dc7eb0a9b6/in/flow/ws/vote');
    self.pairs = self._splitPair(this.data.contestents);

    self.ws.onmessage = function(evt) {
      var allVotes = JSON.parse(evt.data);
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
    };
    self.ws.onopen = function() {
      console.debug('getting initial state');
      self.ws.send(JSON.stringify({id: -2}));
    };

    setTimeout(function() { self._redrawVote.bind(self)(true); }, 500);
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
    if (!this.voted) {
      this.voted = contestent.id;
      this.ws.send(JSON.stringify({id: contestent.id}));
    }
  }

  reset() {
    this.ws.send(JSON.stringify({id: 0}));
  }

  _reComputeTotalCount() {
    var self = this;
    var totalVote = this.data.contestents
      .map(contestent => contestent.vote)
      .reduce((total, vote) => total + vote, 0);
    self.data.contestents = self.data.contestents.map(contestent => {
      contestent.votePercentage = (totalVote) ? contestent.vote / totalVote : 0;

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
