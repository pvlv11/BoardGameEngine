import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  private status: string = '';

  canActivate(): boolean {
    if (!this.auth.checkUserStatus()) {
      this.router.navigate(['login']);
      return false;
    }
      return true;

    // this.auth.checkUserStatusBack().subscribe(data => {
    //   this.status = data.user;
    // })

    // if (this.status == 'user is logged in') {
    //   console.log('true');
    //   return true;
    // }
    // else {
    //   console.log('false');
    //   this.router.navigate(['login']);
    //   return false;
    // }
  }
}