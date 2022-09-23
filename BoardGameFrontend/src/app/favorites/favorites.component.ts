import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface FavoriteItem { 
  src: string; 
  title: string;
  description: string;
  state: boolean;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  showFirst = true;

  constructor(private router: Router) { }

  goToGame() {
    this.router.navigate(['/', 'game']);
  }

  favorites: FavoriteItem[] = [
    {
      src:'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__imagepage/img/-17KkOmxbTu2slJTabGrkO8ZW8s=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg',
      title:'Brass: Birmingham',
      description: 'Brass: Birmingham features a deceptively straightforward rule set which creates interesting gameplay dynamics including a highly innovative variable turn order system and robust gift economy. Unlike its predicessor, Brass: Birmingham features a dynamic board setup, making each game unfold completely differently each time you play. ' +
      'Brass: Birmingham features meticulously crafted illustrations by Damien Mammoliti and Mr. Cuddington, elegant graphic design, and high quality components. ' +
      'If you’ve played Brass in the past, learning how to play Birmingham will be a snap as it uses most of the same core ruleset. But Brass: Birmingham creates an entirely new and unique experience from its predecessor with a new mechanics, new industries, and new strategies waiting for you to discover.',
      state: true
    },
    {
      src:'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg',
      title:'Scythe',
      description: 'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow. The capitalistic city-state known simply as The Factory, which fueled the war with heavily armored mechs, has closed its doors, drawing the attention of several nearby countries. ' +
      'Other than each player’s individual hidden objective cards, the only elements of luck are encounter cards that players will draw as they interact with the citizens of newly explored lands and combat cards that give you a temporary boost in combat. Combat is also driven by choices, not luck or randomness.',
      state: true
    }
  ]

  ngOnInit(): void {
  }

  favClick(clickedItem: number) {
    this.favorites[clickedItem].state = !this.favorites[clickedItem].state;
    for (let item of this.favorites) {  
       if ( item !== this.favorites[clickedItem] ) { 
           item.state = true; 
       }
    }
 }

}
