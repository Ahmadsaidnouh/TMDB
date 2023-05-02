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
      // console.log(params.get('slug')?.split("-"));
      let param = params.get('slug')?.split("-")[0];
      
      this.movieId = param;
      // console.log(this.movieId);

      this.getMovieDetails(this.movieId)
      
      // if (this.category == "popular")
      //   this.categoryName = "Popular"
      // else if (this.category == "top_rated")
      //   this.categoryName = "Top Rated"
      // else if (this.category == "upcoming")
      //   this.categoryName = "Upcoming"
      // else if (this.category == "now_playing")
      //   this.categoryName = "Now Playing"
      // console.log(this.category);
      // this.movies = []
      // this.getMovies(this.category, this.pageNumber)
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

  // toggleOptions(e: any) {
  //   // console.log(e.target);
  //   let element = e.target;
  //   console.log(element.innerHTML);
  //   if (element.innerHTML == '') {
  //     if (element.parentElement.nextElementSibling.classList.contains("d-none")) {
  //       element.parentElement.nextElementSibling.classList.replace("d-none", "d-block")
  //     }
  //     else {
  //       element.parentElement.nextElementSibling.classList.replace("d-block", "d-none")
  //     }
  //   }
  //   else {
  //     if (element.nextElementSibling.classList.contains("d-none")) {
  //       element.nextElementSibling.classList.replace("d-none", "d-block")
  //     }
  //     else {
  //       element.nextElementSibling.classList.replace("d-block", "d-none")
  //     }
  //   }

  // }

  displayMovieDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`movieDetails/${movieId}-${title}`]);
  }

  getMovieDetails(movieId:string) {
    this._TmdbService.getMovieDetails(movieId).subscribe((response) => {
      this.movie = response
      this.photo = this.bgImgPrefix + this.movie.backdrop_path;
      console.log(response);
      
      // this.movies.push(...response.results);
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
    // let completeDate = new Date(date);
    // let month = completeDate.toLocaleString('default', { month: 'short' })
    // let reformdate = `${month} ${completeDate.getDate()}, ${completeDate.getFullYear()}`
    // // const date = new Date(2009, 10, 10);  // 2009-11-10
    // // const month = date.toLocaleString('default', { month: 'long' });
    // // console.log(month);
    // // console.log(typeof completeDate.);

    // // completeDate = completeDate.splice(" ")
    // // let reformated = completeDate[1] + " " + completeDate[2] + ", " +  completeDate[3]
    // return reformdate
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
      // console.log(runtime);
      
      let hours = Math.floor(runtime / 60)
      // console.log(hours);
      
      let min = runtime - hours*60
      // console.log(min);
      
      return (hours+'h ' + min + 'm');
    } catch (error) {
      return ''
    }
  }
}
