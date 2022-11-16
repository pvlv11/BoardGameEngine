import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/BoardGamesAPI/user/register_user?username=${username}&email=${email}&password=${password}`, null)
  }
}
