import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getTop10(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/BoardGamesAPI/games/top_10_games')
  }

  getSearch(str: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/search_by_string?name_string=${str}`)
  }

  getSingleGame(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/getAllGames?game_id=${id}`)
  }
}
