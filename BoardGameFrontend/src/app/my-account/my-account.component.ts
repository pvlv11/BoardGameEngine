import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

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

  constructor(private router: Router, private authService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  user: User = {
    username: 'admin',
    email: 'admin@gamil.com'
  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data);
    })
  }

}
