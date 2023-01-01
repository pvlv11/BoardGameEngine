import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  username = sessionStorage.getItem("Username")?.replace(/['"']+/g, '');
  email = sessionStorage.getItem("Email")?.replace(/['"']+/g, '');

  logout() {
    this.authService.logout().subscribe(data => {
      this.showSuccess();
      this.router.navigate(['/', 'login']);
    })
  }

  showSuccess() {
    this.toast.success({detail:"SUCCESS",summary:'User successfully logged out!', duration: 2000, position:'tr'});
  }

}
