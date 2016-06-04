import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contest/contest.html'
})
export class ContestPage {
  constructor() {
    console.log('test');
    setTimeout(function() {
      var containers = document.querySelectorAll('.contestent .container');
      
      for (var i = 0; i < containers.length; i ++) {
        var bar = new ProgressBar.Circle(containers[i], {
          strokeWidth: 5,
          easing: 'easeInOut',
          duration: 1400,
          color: '#00f9b2',
          trailColor: 'rgb(240, 240, 240)',
          trailWidth: 5,
          svgStyle: null
        });
        
        bar.animate(Math.random());  
      }
    }, 500);
  }
}
