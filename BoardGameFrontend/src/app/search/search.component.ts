import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

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
  currentGamesToShow: Game[] = [];
  searchString: string = "";
  searchStr: string = "";
  loaded: boolean = false;

  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
   }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.searchString = params['name_string'];
      }
      );

    this.gamesService.getSearch(this.searchString).subscribe(data =>{
      this.games = data;
      this.currentGamesToShow = this.games.slice(0,5);
      this.loaded = true;
    })
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.currentGamesToShow =  this.games.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  goToGame(id: number) {
    this.router.navigate(['/', 'game'],
    {queryParams: { game: id }}
    );
  }

  favClick(clickedItem: number) {
    this.games[clickedItem].state = !this.games[clickedItem].state;
 }

 goToSearch() {
  const search = this.searchStr;
    this.router.navigate(
      ['/','search'],
      {queryParams: { name_string: search }}
      );
  }
  

}

