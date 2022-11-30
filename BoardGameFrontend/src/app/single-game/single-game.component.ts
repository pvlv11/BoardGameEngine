import { Component, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { Game } from '../models/game';
import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';

export interface GameItem { 
  img: string,
  title: string,
  state: boolean,
  rating: number, 
  label: string,
  players: string,
  age: string, 
  time: string,
  categories: Array<string>,
  description: string
}

interface Rating {
  value: number;
  max: number;
  color?: ThemePalette;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;
}

export interface DialogData {
  name: string;
  user_rating: string;
}

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss']
})
export class SingleGameComponent implements OnInit {

  constructor(private router: Router, private gamesService: GamesService, private route: ActivatedRoute, 
    private auth: AuthService, public dialog: MatDialog) { }

  id: number = 0;
  game: Game[] = [];
  name: string = "";
  user_rating: number = 0;

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['game_id'];
      }
      );

    this.gamesService.getSingleGame(this.id).subscribe(data =>{
      this.game = data;
      console.log(this.game[0]);
      this.name = this.game[0].name;
    })

  }

  // rating: Rating = {
  //   value: 4,
  //   max: 5,
  //   color: "accent",
  //   readonly: true
  // }

  favClick() {
    this.game[0].is_favourite = !this.game[0].is_favourite;
 }

  isLoggedIn() {
    return this.auth.checkUserStatus();
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(Dialog, {
    //   width: '250px',
    //   data: {name: this.name, user_rating: this.user_rating}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.user_rating = result;
    //   console.log(result);
    // });

     let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, user_rating: this.user_rating}
     });

     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user_rating = result;
      console.log(this.user_rating);
     });
  }

}

