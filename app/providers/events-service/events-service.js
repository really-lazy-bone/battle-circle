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
        name: 'AT&T Hack Talent Show 💃',
        img: 'imgs/att_roc.jpg',
        contestents: [
          {
            id: 1,
            name: 'Pierre',
            img: 'imgs/pierre-avatar.png',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 2,
            name: 'Michael',
            img: 'imgs/michael-avatar.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 3,
            name: 'Eric',
            img: 'imgs/eric-avatar.jpg',
            vote: parseInt(Math.random() * 10)
          }
        ]
      },
      {
        name: 'Dance Off Fam 😂',
        img: 'imgs/family.jpg',
        contestents: [
          {
            id: 4,
            name: 'Mark',
            img: 'imgs/person3.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 5,
            name: 'Steven',
            img: 'imgs/person4.jpg',
            vote: parseInt(Math.random() * 10)
          }
        ]
      }
    ];

    this.pastData = [
      {
        name: 'Lip-sync Battle 🎤',
        img: 'imgs/lip-sync-battle.jpg',
        contestents: [
          {
            id: 6,
            name: 'Eric',
            img: 'imgs/person9.png',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 7,
            name: 'Michael',
            img: 'imgs/person8.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 8,
            name: 'Pierre',
            img: 'imgs/person1.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 9,
            name: 'Pierre',
            img: 'imgs/person2.jpeg',
            vote: parseInt(Math.random() * 10)
          }
        ]
      },
      {
        name: 'Loudest YELL 😱😱😱😱',
        img: 'imgs/evil-burns.png',
        contestents: [
          {
            id: 10,
            name: 'Mark',
            img: 'imgs/person4.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 11,
            name: 'Steven',
            img: 'imgs/person5.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 12,
            name: 'Alex',
            img: 'imgs/person6.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 13,
            name: 'Pierre',
            img: 'imgs/person7.jpg',
            vote: parseInt(Math.random() * 10)
          },
          {
            id: 14,
            name: 'Pierre',
            img: 'imgs/person3.jpg',
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
