import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contest/contest.html'
})
export class ContestPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }
  
  constructor(nav, params) {
    this.data = params.get('item');
    var self = this;
    var totalVote = this.data.contestents.map(contestent => {
      return contestent.vote
    }).reduce((total, vote) => {
      return total + vote
    }, 0);
    self.data.contestents = self.data.contestents.map(contestent => {
      contestent.votePercentage = contestent.vote / totalVote;
      return contestent;
    });
    
    setTimeout(function() {
      var containers = document.querySelectorAll('.contestent .container');
      
      for (var i = 0; i < containers.length; i ++) {
        var id = containers[i].getAttribute('id');
        var votePercentage = self.data.contestents.filter(contestent => contestent.id === parseInt(id))
          .map(contestent => contestent.votePercentage)[0];
        var bar = new ProgressBar.Circle(containers[i], {
          strokeWidth: 5,
          easing: 'easeInOut',
          duration: 1400,
          color: '#00f9b2',
          trailColor: 'rgb(240, 240, 240)',
          trailWidth: 5,
          svgStyle: null
        });
        
        bar.animate(votePercentage);
      }
    }, 500);
  }
}
