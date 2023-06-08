import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private HttpClient: HttpClient) { }

  getTrending(media_type:string, time_window:string): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=6095507f96351eea753d5123d0ee32c0`)
  }
  getMovies(movie_option:string, pageNumber:number): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/movie/${movie_option}?api_key=6095507f96351eea753d5123d0ee32c0&language=en-US&page=${pageNumber}`)
  }
  getMovieDetails(movieId:string): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6095507f96351eea753d5123d0ee32c0`)
  }
  getTvDetails(tvId:string): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=6095507f96351eea753d5123d0ee32c0`)
  }
  getPersonDetails(personId:string): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/person/${personId}?api_key=6095507f96351eea753d5123d0ee32c0`)
  }
  getTvShows(tv_option:string, pageNumber:number): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/tv/${tv_option}?api_key=6095507f96351eea753d5123d0ee32c0&language=en-US&page=${pageNumber}`)
  }
  getPeople(pageNumber:number): Observable<any> {
    return this.HttpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=6095507f96351eea753d5123d0ee32c0&language=en-US&page=${pageNumber}`)
  }
}
