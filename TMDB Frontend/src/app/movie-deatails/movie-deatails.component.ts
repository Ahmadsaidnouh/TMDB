import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-deatails',
  templateUrl: './movie-deatails.component.html',
  styleUrls: ['./movie-deatails.component.css']
})
export class MovieDeatailsComponent implements OnInit {
  movieId:string = '';
  pageNumber: number = 1;
  category: string = "";
  categoryName: string = "";
  isSignedIn: boolean = false;
  bgImgPrefix: string = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  movie: any = {};
  photo = '';
  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params: any) => {
      let param = params.get('slug')?.split("-")[0];
      
      this.movieId = param;

      this.getMovieDetails(this.movieId)
      
    });
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isSignedIn = true;
      }
      else {
        this.isSignedIn = false;

      }
    })

  }


  displayMovieDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`movieDetails/${movieId}-${title}`]);
  }

  getMovieDetails(movieId:string) {
    this._TmdbService.getMovieDetails(movieId).subscribe((response) => {
      this.movie = response
      this.photo = this.bgImgPrefix + this.movie.backdrop_path;
      console.log(response);

    })
  }
  getReleaseYear() {
    return this.movie.release_date?.split('-')[0];
  }
  ceil() {
    return Math.ceil(this.movie?.vote_average*10)
  }
  getReleaseDate() {
    try {
      let date = this.movie.release_date?.split('-');
      let reform = date[2] + '/' + date[1] + '/' + date[0];
      return reform
    } catch (error) {
      return ""
    }
  }
  getGenres() {
    try {
      let genres = this.movie.genres;
      let cartona = ''
      for (let i = 0; i < genres.length-1; i++) {
        cartona += (genres[i].name + ", ")
      }
      cartona += genres[genres.length-1].name
      return cartona;
    } catch (error) {
      return '';
    }
  }
  getDuration() {
    try {
      let runtime = this.movie.runtime;
      
      let hours = Math.floor(runtime / 60)
      
      let min = runtime - hours*60
      
      return (hours+'h ' + min + 'm');
    } catch (error) {
      return ''
    }
  }
}
