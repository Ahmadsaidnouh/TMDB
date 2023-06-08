import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  pageNumber: number = 1;
  category: string = "";
  categoryName: string = "";
  isSignedIn: boolean = false;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  movies: any[] = [];

  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params: any) => {
      let param = params.get('category')?.replace("-", "_");
      this.category = param != null ? param : "popular";
      if (this.category == "popular")
        this.categoryName = "Popular"
      else if (this.category == "top_rated")
        this.categoryName = "Top Rated"
      else if (this.category == "upcoming")
        this.categoryName = "Upcoming"
      else if (this.category == "now_playing")
        this.categoryName = "Now Playing"
      console.log(this.category);
      this.movies = []
      this.getMovies(this.category, this.pageNumber)
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

  toggleOptions(e: any) {
    let element = e.target;
    console.log(element.innerHTML);
    if (element.innerHTML == '') {
      if (element.parentElement.nextElementSibling.classList.contains("d-none")) {
        element.parentElement.nextElementSibling.classList.replace("d-none", "d-block")
      }
      else {
        element.parentElement.nextElementSibling.classList.replace("d-block", "d-none")
      }
    }
    else {
      if (element.nextElementSibling.classList.contains("d-none")) {
        element.nextElementSibling.classList.replace("d-none", "d-block")
      }
      else {
        element.nextElementSibling.classList.replace("d-block", "d-none")
      }
    }

  }

  displayMovieDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`movieDetails/${movieId}-${title}`]);
  }

  getMovies(movie_option: string, pageNumber: number) {
    this._TmdbService.getMovies(movie_option, pageNumber).subscribe((response) => {

      this.movies.push(...response.results);

    })
  }
  ceil(vote: number) {
    return Math.ceil(vote)
  }
  reformatReleaseDate(date: string) {
    let completeDate = new Date(date);
    let month = completeDate.toLocaleString('default', { month: 'short' })
    let reformdate = `${month} ${completeDate.getDate()}, ${completeDate.getFullYear()}`
    return reformdate
  }
  loadMore() {
    this.pageNumber++;
    this.getMovies(this.category, this.pageNumber);
  }
}
