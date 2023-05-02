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
    // let param = this._ActivatedRoute.snapshot.paramMap.get("category")?.replace("-", "_");
    // console.log(this._ActivatedRoute.snapshot.paramMap.get("category"));
    // this._Router
    // this.getMovies(this.category, this.pageNumber)
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
    // console.log(e.target);
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
      // console.log(response.results[0].poster_path);
      // setTimeout(() => {
      //   let wer = document.querySelectorAll("div .rate");
      //   console.log(wer, wer.item(0) , wer.length);
      //   // console.log(document.getElementsByTagName("section")[0]);
      // }, 5000);


      // let elements = Array.from(wer);
      // console.log(elements);

    })
  }
  ceil(vote: number) {
    return Math.ceil(vote)
  }
  reformatReleaseDate(date: string) {
    let completeDate = new Date(date);
    let month = completeDate.toLocaleString('default', { month: 'short' })
    let reformdate = `${month} ${completeDate.getDate()}, ${completeDate.getFullYear()}`
    // const date = new Date(2009, 10, 10);  // 2009-11-10
    // const month = date.toLocaleString('default', { month: 'long' });
    // console.log(month);
    // console.log(typeof completeDate.);

    // completeDate = completeDate.splice(" ")
    // let reformated = completeDate[1] + " " + completeDate[2] + ", " +  completeDate[3]
    return reformdate
  }
  loadMore() {
    this.pageNumber++;
    this.getMovies(this.category, this.pageNumber);
  }
  // changeTimeWindow(e: any) {
  // console.log(e.target);
  // let timeWindow = e.target
  // // console.log(timeWindow.classList.contains("time-window-active")) 
  // // console.log(timeWindow.innerHTML) 

  // if (!timeWindow.classList.contains("time-window-active")) {
  //   timeWindow.classList.add("time-window-active")
  //   if (timeWindow.innerHTML == "Today") {
  //     // console.log(1);
  //     timeWindow.nextElementSibling.classList.remove("time-window-active")
  //     this.getMovies("day")
  //   }
  //   else {
  //     // console.log(2);
  //     timeWindow.previousElementSibling.classList.remove("time-window-active")
  //     this.getMovies("week")
  //   }
  // }
  // }
}
