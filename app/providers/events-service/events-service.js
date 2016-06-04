import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {
  constructor() {
    this.data = [
      {
        name: 'AT&T Hack-a-thon talent show',
        img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/nightlife',
        contestents: [
          {
            id: 1,
            name: 'Eric',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 2,
            name: 'Michael',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 3,
            name: 'Pierre',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          }
        ]
      },
      {
        name: 'Streetclub yo',
        img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/nightlife',
        contestents: [
          {
            id: 4,
            name: 'Mark',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 5,
            name: 'Steven',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          }
        ]
      }
    ];
    
    this.pastData = [
      {
        name: 'AT&T Developer Summit',
        img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/nightlife',
        contestents: [
          {
            id: 6,
            name: 'Eric',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 7,
            name: 'Michael',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 8,
            name: 'Pierre',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 9,
            name: 'Pierre',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          }
        ]
      },
      {
        name: 'AngelHack',
        img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/nightlife',
        contestents: [
          {
            id: 10,
            name: 'Mark',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 11,
            name: 'Steven',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 12,
            name: 'Alex',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 13,
            name: 'Pierre',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 14,
            name: 'Pierre',
            img: 'http://lorempixel.com/' + (parseInt(Math.random() * 300) + 50) + '/' + (parseInt(Math.random() * 300) + 50) + '/people',
            vote: parseInt(Math.random() * 10)
          }
        ]
      }
    ];
  }

  getActiveEvents() {
    return this.data;
  }
  
  getPastEvents() {
    return this.pastData;
  }
}
