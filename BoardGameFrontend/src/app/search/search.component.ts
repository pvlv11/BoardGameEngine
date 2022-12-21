import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AuthService } from '../services/auth.service';
import { keyValuesToMap } from '@angular/flex-layout/extended/style/style-transforms';
import { AppComponent } from '../app.component';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


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
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class SearchComponent implements OnInit {

  public filterForm!: FormGroup;

  games: any[] = [];
  currentGamesToShow: Game[] = [];
  searchString: string = "";
  searchStr: string = "";
  loaded: boolean = false;
  selected: string = "";
  sorted: boolean = true;
  user_id: any = sessionStorage.getItem('User_id');

  ages: number[] = [];
  genres: string[] = [];
  players: number[] = [];
  time: number[] = [];
  minPlayers!: number;
  maxPlayers!: number;
  minTime!: number;
  maxTime!: number;
  minAge!: number;
  maxAge!: number;
  category!: string;


  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute,
    private auth: AuthService, private toast: NgToastService) {
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
    if (this.isLoggedIn()) {
      let user = sessionStorage.getItem("User_id");
      this.gamesService.getSearch(this.searchString, user).subscribe(data =>{
        this.games = data;
        this.currentGamesToShow = this.games.slice(0,5);
        this.loaded = true;
      })
    }
    else {
      this.gamesService.getSearch(this.searchString, 0).subscribe(data =>{
        this.games = data;
        this.currentGamesToShow = this.games.slice(0,5);
        this.loaded = true;
      })
    }

    this.gamesService.getFilters().subscribe(data => {
      this.ages = data[0].age;
      this.genres = data[0].genres;
      this.players = data[0].player;
      this.time = data[0].time;
    })
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.currentGamesToShow =  this.games.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  goToGame(id: number) {
    this.router.navigate(['/', 'game'],
    {queryParams: { game_id: id }}
    );
  }

  favClick(clickedItem: number) {
    if (this.games[clickedItem].is_favourite) {
      this.gamesService.removeFavourite(this.user_id, this.games[clickedItem].id).subscribe(data => {
        this.games[clickedItem].is_favourite = false;
      })
    }
    else {
      this.gamesService.addFavourite(this.user_id, this.games[clickedItem].id).subscribe(data => {
        this.games[clickedItem].is_favourite = true;
      })
    }
 }

 goToSearch() {
  if(this.isLoggedIn()) {
    let user = localStorage.getItem("User_id");
    const search = this.searchStr;
    this.router.navigate(
      ['/','search'],
      {queryParams: { name_string: search, user_id: user }}
    );
  }
  else {
    let user = 0;
    const search = this.searchStr;
    this.router.navigate(
      ['/','search'],
      {queryParams: { name_string: search, user_id: user }}
      );
  }
  }

  isLoggedIn() {
    return this.auth.checkUserStatus();
  }

  reloadArray() {
    this.games = [...this.games];
  }

  sort(value: string) {
    switch(value) {
      case 'A-Z':
        this.sorted = false;
        this.games.sort((a, b) => {
          if (a.name < b.name) {
              return -1;
          }
          if (a.name > b.name) {
              return 1;
          }
          return 0;
        });
        this.currentGamesToShow = this.games.slice(0,5);
        this.sorted = true;
        break;
      case 'Z-A':
        this.sorted = false;
        this.games.sort((a, b) => {
          if (a.name < b.name) {
              return 1;
          }
          if (a.name > b.name) {
              return -1;
          }
          return 0;
        });
        this.currentGamesToShow = this.games.slice(0,5);
        this.sorted = true;
        break;
      case 'rating ascending':
        this.sorted = false;
        let sortedArr = this.games.sort((a, b) => {
          if (a.rank_value < b.rank_value) {
              return 1;
          }
          if (a.rank_value > b.rank_value) {
              return -1;
          }
          return 0;
        });
        this.games = sortedArr;
        this.currentGamesToShow = this.games.slice(0,5);
        this.sorted = true;
        break;
      case 'rating descending':
        this.sorted = false;
        this.games.sort((a, b) => {
          if (a.rank_value < b.rank_value) {
              return -1;
          }
          if (a.rank_value > b.rank_value) {
              return 1;
          }
          return 0;
        });
        this.currentGamesToShow = this.games.slice(0,5);
        this.sorted = true;
        break;
    }
  }

  filter() {
    let error = false;
    if (this.minTime > this.maxTime) {
      this.toast.error({detail:"ERROR",summary:"Max time can't be smaller than min time!",sticky:true, position:'tr'});
      error = true;
    }
    if (this.minAge > this.maxAge) {
      this.toast.error({detail:"ERROR",summary:"Max age can't be smaller than min time!",sticky:true, position:'tr'});
      error = true;
    }
    if (this.minPlayers > this.maxPlayers) {
      this.toast.error({detail:"ERROR",summary:"Max players can't be smaller than min players!",sticky:true, position:'tr'});
      error = true;
    }

    if ((this.minTime == undefined && this.maxTime != undefined) || (this.maxTime == undefined && this.minTime != undefined)) {
      this.toast.error({detail:"ERROR",summary:"Min or max time can't be empty if the other one isn't!",sticky:true, position:'tr'});
      error = true;
    }

    if ((this.minAge == undefined && this.maxAge != undefined) || (this.maxAge == undefined && this.minAge != undefined)) {
      this.toast.error({detail:"ERROR",summary:"Min or max age can't be empty if the other one isn't!",sticky:true, position:'tr'});
      error = true;

    }

    if ((this.minPlayers == undefined && this.maxPlayers != undefined) || (this.maxPlayers == undefined && this.minPlayers != undefined)) {
      this.toast.error({detail:"ERROR",summary:"Min or max players can't be empty if the other one isn't!",sticky:true, position:'tr'});
      error = true;
    }

    if (!error) {
      let age_filter;
      let time_filter;
      let players_filter;
      let genre_filter;
      if (this.minAge == undefined) {
        age_filter = -1;
      }
      else {
        age_filter = `${this.minAge}-${this.maxAge}`;
      }
      if (this.minTime == undefined) {
        time_filter = -1;
      }
      else {
        time_filter = `${this.minTime}-${this.maxTime}`;
      }
      if (this.minPlayers == undefined) {
        players_filter = -1;
      }
      else {
        players_filter = `${this.minAge}-${this.maxAge}`;
      }

      this.loaded = false;
      this.currentGamesToShow = [];

      if (this.isLoggedIn()) {
        let user = sessionStorage.getItem("User_id");
        this.gamesService.filterGames(user, this.category, age_filter, time_filter, players_filter).subscribe(data =>{
          this.games = data;
          this.currentGamesToShow = this.games.slice(0,5);
          this.loaded = true;
      })
      }
      else {
        this.gamesService.filterGames(0, this.category, age_filter, time_filter, players_filter).subscribe(data =>{
          this.games = data;
          this.currentGamesToShow = this.games.slice(0,5);
          this.loaded = true;
        })
      }
    }
  }
  

}

