import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  games: Game[] = [
    {
      image: "https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__imagepage/img/pBaOL7vV402nn1I5dHsdSKsFHqA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2437871.jpg",
      title: "Gloomhaven"
    },
    {
      image: "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__imagepage/img/-17KkOmxbTu2slJTabGrkO8ZW8s=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg",
      title: "Brass: Birmingham"
    },
    {
      image: "https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__imagepage/img/FS1RE8Ue6nk1pNbPI3l-OSapQGc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3536616.jpg",
      title: "Terraforming Mars"
    },
    {
      image: "https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg",
      title: "Scythe"
    },
    {
      image:'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04hw__imagepage/img/hGdIQZbCqxvEyQ5s8ETrmypyIlA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
      title:'The Castles of Burgundy'
    },
    {
      image:'https://cf.geekdo-images.com/tAqLpWxQ0Oo3GaPP3MER1g__imagepage/img/XyHxeMepMS292xwGjwdK6SvPL4I=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5073276.jpg',
      title:'Nemesis'
    },
    {
      image:'https://cf.geekdo-images.com/zdagMskTF7wJBPjX74XsRw__imagepage/img/HdJ4d4O1P89V4UIhZnL3zoYnjow=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2576399.jpg',
      title:'7 Wonders Duel'
    },
    {
      image:'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg',
      title:'Wingspan'
    },
    {
      image:'https://cf.geekdo-images.com/CzwSm8i7tkLz6cBnrILZBg__imagepage/img/wLKrQnpz-Udm23hoDBRjyKgHEvo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3453267.jpg',
      title:'Concordia'
    },
    {
      image:'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__imagepage/img/qR1EvTSNPjDa-pNPGxU9HY2oKfs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6293412.jpg',
      title:'Ark Nova'
    }
  ]
  constructor() { }

  getTop10() {
    return this.games;
  }
}
