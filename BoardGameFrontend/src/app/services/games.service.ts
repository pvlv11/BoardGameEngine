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

  getReview(user: number, game: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/get_games_review?user=${user}&game=${game}`)
  }

  addReview(user: number, game: number, game_score: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/BoardGamesAPI/games/add_del_review?user=${user}&game=${game}
    &game_score=${game_score}&description=""`, null)
  }

  editReview(user: number, game: number, game_score: number): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/BoardGamesAPI/games/add_del_review?user=${user}&game=${game}
    &game_score=${game_score}&description=""`, null)
  }

  getFavourites(user: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/get_favourite?user=${user}`)
  }
}
