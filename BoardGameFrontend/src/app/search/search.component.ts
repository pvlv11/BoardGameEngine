import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';
import { ActivatedRoute } from '@angular/router';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { AuthService } from '../services/auth.service';
import { keyValuesToMap } from '@angular/flex-layout/extended/style/style-transforms';
import { AppComponent } from '../app.component';

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

  games: any[] = [];
  currentGamesToShow: Game[] = [];
  searchString: string = "";
  searchStr: string = "";
  loaded: boolean = false;
  selected: string = "";
  sorted: boolean = true;

  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute,
    private auth: AuthService, private changeDetection: ChangeDetectorRef) {
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
    this.games[clickedItem].is_favourite = !this.games[clickedItem].is_favourite;
 }

 goToSearch() {
  const search = this.searchStr;
    this.router.navigate(
      ['/','search'],
      {queryParams: { name_string: search }}
      );
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
  

}

