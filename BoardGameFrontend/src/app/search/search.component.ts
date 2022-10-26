import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';

export interface GameItem { 
  src: string; 
  title: string;
  description: string;
  state: boolean;
  rating: number;
  label: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  games: Game[] = [];
  searchString: string = "";

  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.searchString = params['name_string'];
      }
      );

    this.gamesService.getSearch(this.searchString).subscribe(data =>{
      this.games = data;
    })
  }

  goToGame() {
    this.router.navigate(['/', 'game']);
  }

  favClick(clickedItem: number) {
    this.games[clickedItem].state = !this.games[clickedItem].state;
 }

}
