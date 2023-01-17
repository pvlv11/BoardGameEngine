import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  constructor(private router: Router, private gamesService: GamesService) { }

  favorites: any[] = [];
  user_id: any = sessionStorage.getItem('User_id');
  searchText: string = "";
  currentGamesToShow: Game[] = [];
  selected: string = "";

  goToGame(id: number) {
    this.router.navigate(['/', 'game'],
    {queryParams: { game_id: id }}
    );
  }

  ngOnInit(): void {
    this.gamesService.getFavourites(this.user_id).subscribe(data => {
      this.favorites = data;
      this.favorites.reverse();
      this.currentGamesToShow = this.favorites.slice(0,5);
      console.log(this.favorites);
    })
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.currentGamesToShow =  this.favorites.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  favClick(clickedItem: number) {
    if (this.favorites[clickedItem].is_favourite) {
      this.gamesService.removeFavourite(this.user_id, this.favorites[clickedItem].id).subscribe(data => {
        console.log(data);
        this.favorites[clickedItem].is_favourite = false;
      })
    }
    else {
      this.gamesService.addFavourite(this.user_id, this.favorites[clickedItem].id).subscribe(data => {
        console.log(data);
        this.favorites[clickedItem].is_favourite = true;
      })
    }
 }

 sort(value: string) {
  switch(value) {
    case 'A-Z':
      this.favorites.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
      });
      this.currentGamesToShow = this.favorites.slice(0,5);
      break;
    case 'Z-A':
      this.favorites.sort((a, b) => {
        if (a.name < b.name) {
            return 1;
        }
        if (a.name > b.name) {
            return -1;
        }
        return 0;
      });
      this.currentGamesToShow = this.favorites.slice(0,5);
      break;
    case 'rating ascending':
      let sortedArr = this.favorites.sort((a, b) => {
        if (a.rank_value < b.rank_value) {
            return 1;
        }
        if (a.rank_value > b.rank_value) {
            return -1;
        }
        return 0;
      });
      this.favorites = sortedArr;
      this.currentGamesToShow = this.favorites.slice(0,5);
      break;
    case 'rating descending':
      this.favorites.sort((a, b) => {
        if (a.rank_value < b.rank_value) {
            return -1;
        }
        if (a.rank_value > b.rank_value) {
            return 1;
        }
        return 0;
      });
      this.currentGamesToShow = this.favorites.slice(0,5);
      break;
  }
}

}
