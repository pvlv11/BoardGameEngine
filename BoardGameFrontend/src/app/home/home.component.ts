import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  goToGame() {
    this.router.navigate(['/', 'game']);
  }

  goToSearch() {
    this.router.navigate(['/','search']);
  }

  slides = [
    {
      id: '1',
      src:'https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__imagepage/img/pBaOL7vV402nn1I5dHsdSKsFHqA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2437871.jpg',
      alt:'1: Gloomhaven',
      title:'1: Gloomhaven'
    },
    {
      id: '2',
      src:'https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__imagepage/img/-17KkOmxbTu2slJTabGrkO8ZW8s=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3490053.jpg',
      alt:'2: Brass: Birmingham',
      title:'2: Brass: Birmingham'
    },
    {
      id: '3',
      src:'https://cf.geekdo-images.com/wg9oOLcsKvDesSUdZQ4rxw__imagepage/img/FS1RE8Ue6nk1pNbPI3l-OSapQGc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3536616.jpg',
      alt:'3: Terraforming Mars',
      title:'3: Terraforming Mars'
    },
    {
      id: '4',
      src:'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__imagepage/img/zoz-t_z9nqqxL7OwQenbqp9PRl8=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3163924.jpg',
      alt:'4: Scythe',
      title:'4: Scythe'
    },
    {
      id: '5',
      src:'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04hw__imagepage/img/hGdIQZbCqxvEyQ5s8ETrmypyIlA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1176894.jpg',
      alt:'5: The Castles of Burgundy',
      title:'5: The Castles of Burgundy'
    },
    {
      id: '6',
      src:'https://cf.geekdo-images.com/tAqLpWxQ0Oo3GaPP3MER1g__imagepage/img/XyHxeMepMS292xwGjwdK6SvPL4I=/fit-in/900x600/filters:no_upscale():strip_icc()/pic5073276.jpg',
      alt:'6: Nemesis',
      title:'6: Nemesis'
    },
    {
      id: '7',
      src:'https://cf.geekdo-images.com/zdagMskTF7wJBPjX74XsRw__imagepage/img/HdJ4d4O1P89V4UIhZnL3zoYnjow=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2576399.jpg',
      alt:'7: 7 Wonders Duel',
      title:'7: 7 Wonders Duel'
    },
    {
      id: '8',
      src:'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg',
      alt:'8: Wingspan',
      title:'8: Wingspan'
    },
    {
      id: '9',
      src:'https://cf.geekdo-images.com/CzwSm8i7tkLz6cBnrILZBg__imagepage/img/wLKrQnpz-Udm23hoDBRjyKgHEvo=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3453267.jpg',
      alt:'9: Concordia',
      title:'9: Concordia'
    },
    {
      id: '10',
      src:'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__imagepage/img/qR1EvTSNPjDa-pNPGxU9HY2oKfs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic6293412.jpg',
      alt:'10: Ark Nova',
      title:'10: Ark Nova'
    }
  ]


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
  }

}
