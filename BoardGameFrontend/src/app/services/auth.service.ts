import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) { }


  register(username: string, email: string, password: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/BoardGamesAPI/user/register_user?username=${username}&email=${email}&password=${password}`)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/BoardGamesAPI/user/login_user?username=${username}&password=${password}`)
  }

  logout(): Observable<any> {
    sessionStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('Username');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('User_id');
    return this.http.get<any>(`http://127.0.0.1:8000/BoardGamesAPI/user/logout`)
  }

  checkUserStatusBack(): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/BoardGamesAPI/user/check_user_status`)
  }

  checkUserStatus(): boolean {
    if (sessionStorage.getItem("CurrentUser") == null)
      return false;
    else
      return true;
  }

  canActivate(): boolean {
    if (this.checkUserStatus()) {
      this.router.navigate(['home']);
      return false;
    }
      return true;
  }

}
