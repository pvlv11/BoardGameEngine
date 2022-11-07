import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';

export interface GameItem { 
  img: string,
  title: string,
  state: boolean,
  rating: number, 
  label: string,
  players: string,
  age: string, 
  time: string,
  categories: Array<string>,
  description: string
}

interface Rating {
  value: number;
  max: number;
  color?: ThemePalette;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;
}

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute) { }

  id: number = 0;
  game: Game[] = [];

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['game'];
      }
      );

    this.gamesService.getSingleGame(this.id).subscribe(data =>{
      this.game = data;
      console.log(this.game[0])
    })
  }

  // rating: Rating = {
  //   value: 4,
  //   max: 5,
  //   color: "accent",
  //   readonly: true
  // }

  favClick() {
    this.game[0].state = !this.game[0].state;
 }

}
