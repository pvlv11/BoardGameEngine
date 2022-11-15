import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Game } from '../models/game';
import { GamesService } from '../services/games.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  games: Game[] = [];
  searchString: String = "";
  selected: any;

  constructor(private router: Router, private gamesService: GamesService) {
   }

  goToGame(id: number) {
    this.router.navigate(['/', 'game'],
    {queryParams: { game: id }}
    );
  }

  goToSearch() {
    const search = this.searchString;
    this.router.navigate(
      ['/','search'],
      {queryParams: { name_string: search }}
      );
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 5,
    autoplay: true, 
    autoplayHoverPause: true,
    smartSpeed: 10,
    autoplaySpeed: 600,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.gamesService.getTop10().subscribe(data=>{
      this.games = data;
      console.log(this.games);
    });
  }
}
