import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  username: string;
  email: string;
}

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user: User = {
    username: 'admin',
    email: 'admin@gamil.com'
  }

}
