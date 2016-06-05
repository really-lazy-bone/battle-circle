import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import {DBMeter} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/control/control.html'
})
export class ControlPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, params) {
    var self = this;
    this.nav = nav;
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
      }
    };
    self.ws.onopen = function() {
      console.debug('getting initial state');
      self.ws.send(JSON.stringify({id: -2}));
    };

    setTimeout(function() {
      self._redrawCounter.bind(self)(true);
    }, 500);
  }

  reset() {
    this.ws.send(JSON.stringify({id: 0}));
  }

  end() {
    this.ws.send(JSON.stringify({id: -1}));
  }

  displayWinner(data) {
    console.debug('displaying winner');
    console.debug(data);
    var winner = this.data.contestents
      .filter(contestent => contestent.id === data[0]._id)[0];
    winner.win = true;
    alert('Winner goes to ... 👏👏👏');
  }

  record(contestent) {
    var self = this;
    if (contestent.recording) {
      self.subscription.unsubscribe();
      self.listening = false;
      contestent.recording = false;
    } else {
      if (!self.listening) {
        self.volumeData = [];
        // Start listening
        self.subscription = DBMeter.start().subscribe(
          data => {
            self.volumeData.push(data);
          }
        );
        contestent.recording = true;
        self.listening = true;
        contestent.halfSecondCounter = 0;
        contestent.recording = setInterval(function() {
          contestent.halfSecondCounter ++;
          if (contestent.halfSecondCounter >= 6) {
            var sum = self.volumeData.reduce((a, b) => a + b);
            var avg = sum / self.volumeData.length;
            alert(JSON.stringify(avg));

            for (var i = 0; i < (avg - 70); i ++) {
              self.ws.send(JSON.stringify({id: contestent.id}));
            }

            self.subscription.unsubscribe();
            self.listening = false;
            contestent.halfSecondCounter = 0;
            clearInterval(contestent.recording);
            contestent.recording = undefined;
          }
          self._redrawCounter.bind(self)();
        }, 500);
      }
    }
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

  _redrawCounter(init) {
    var self = this;
    var containers = document.querySelectorAll('.contestent .recording-container');
    console.log('test')

    for (var i = 0; i < containers.length; i ++) {
      var id = containers[i].getAttribute('id');
      var cstent = self.data.contestents
        .filter(cstent => cstent.id === parseInt(id))[0];
      if (!cstent) return;
      var initialized = cstent.progressBar;
      if (init || !cstent.progressBar) {
        var bar = new ProgressBar.Circle(containers[i], {
          strokeWidth: 5,
          easing: 'bounce',
          duration: 1400,
          color: '#00f9b2',
          trailColor: 'rgb(240, 240, 240)',
          trailWidth: 5,
          svgStyle: null
        });
        cstent.progressBar = bar;
      }

      cstent.progressBar.animate(cstent.halfSecondCounter ? (cstent.halfSecondCounter / 6) : 0);
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
