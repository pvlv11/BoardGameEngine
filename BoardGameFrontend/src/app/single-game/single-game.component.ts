import { Component, OnInit } from '@angular/core';

export interface GameItem { 
  img: string,
  title: string,
  state: boolean,
  rating: number, 
  players: string,
  age: string, 
  time: string,
  categories: Array<string>,
  description: string
}

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  game: GameItem = {
    img: 'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg',
    title: 'Scythe',
    state: true,
    rating: 4.2,
    players: '1-5',
    age: '14+',
    time: '90-115 min',
    categories: [' strategy ', ' economic ', ' fighting '],
    description: 'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow. The capitalistic city-state known simply as “The Factory”, which fueled the war with heavily armored mechs, has closed its doors, drawing the attention of several nearby countries. ' +
    'Scythe is an engine-building game set in an alternate-history 1920s period. It is a time of farming and war, broken hearts and rusted gears, innovation and valor. In Scythe, each player represents a character from one of five factions of Eastern Europe who are attempting to earn their fortune and claim their factions stake in the land around the mysterious Factory. Players conquer territory, enlist new recruits, reap resources, gain villagers, build structures, and activate monstrous mechs.'
  }

  favClick() {
    this.game.state = !this.game.state;
 }

}
