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

  getSearch(str: string, user: any): Observable<any> {
    if (user == 0) {
      return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/search_by_string?name_string=${str}`)
    }
    else {
      return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/search_by_string?name_string=${str}&user_id=${user}`)
    }
  }

  getSingleGame(id: number, user: any): Observable<any> {
    if (user == 0) {
      return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/getAllGames?game_id=${id}`)
    }
    else {
      return this.http.get(`http://127.0.0.1:8000/BoardGamesAPI/games/getAllGames?game_id=${id}&user_id=${user}`)
    }

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

  addFavourite(user: number, game: number): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/BoardGamesAPI/games/add_favourite?user=${user}&game=${game}`, null)
  }

  removeFavourite(user: number, game: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/BoardGamesAPI/games/del_favourite?user=${user}&game=${game}`)
  }

  getFilters(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/BoardGamesAPI/filters/get_filters')
  }

}
