import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  // games: Game[] = [
  //   {
  //     image: "https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__imagepage/img/pBaOL7vV402nn1I5dHsdSKsFHqA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2437871.jpg",
  //     title: "Gloomhaven",
  //     rating: 4.75
  //   },
  //   {
  //     image: "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__imagepage/img/-17KkOmxbTu2slJTabGrkO8ZW8s=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg",
  //     title: "Brass: Birmingham",
  //     rating: 4.7
  //   },
  //   {
  //     image: "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__imagepage/img/FS1RE8Ue6nk1pNbPI3l-OSapQGc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3536616.jpg",
  //     title: "Terraforming Mars",
  //     rating: 4.6
  //   },
  //   {
  //     image: "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg",
  //     title: "Scythe",
  //     rating: 4.5
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04hw__imagepage/img/hGdIQZbCqxvEyQ5s8ETrmypyIlA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
  //     title:'The Castles of Burgundy',
  //     rating: 4.35
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/tAqLpWxQ0Oo3GaPP3MER1g__imagepage/img/XyHxeMepMS292xwGjwdK6SvPL4I=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5073276.jpg',
  //     title:'Nemesis',
  //     rating: 4.1
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/zdagMskTF7wJBPjX74XsRw__imagepage/img/HdJ4d4O1P89V4UIhZnL3zoYnjow=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2576399.jpg',
  //     title:'7 Wonders Duel',
  //     rating: 4.1
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg',
  //     title:'Wingspan',
  //     rating: 4.05
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/CzwSm8i7tkLz6cBnrILZBg__imagepage/img/wLKrQnpz-Udm23hoDBRjyKgHEvo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3453267.jpg',
  //     title:'Concordia',
  //     rating: 4.0
  //   },
  //   {
  //     image:'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__imagepage/img/qR1EvTSNPjDa-pNPGxU9HY2oKfs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6293412.jpg',
  //     title:'Ark Nova',
  //     rating: 4.0
  //   }
  // ]
  constructor(private http: HttpClient) { }

  getTop10(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/BoardGamesAPI/games/top_10_games');
  }
}
