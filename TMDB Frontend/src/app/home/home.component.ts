import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isSignedIn:boolean = false;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  trendingMovies: any[] = [];

  constructor(private _TmdbService: TmdbService, private _Router:Router, private _AuthService: AuthService) { }

  ngOnInit(): void {
    // console.log("initn");
    this.getTrending("day")
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

  displayMovieDetails(movieId:string,movieTitle:string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`movieDetails/${movieId}-${title}`]);
  }

  getTrending(timeWindow: string) {
    this._TmdbService.getTrending("movie", timeWindow).subscribe((response) => {
      this.trendingMovies = response.results;
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
  changeTimeWindow(e: any) {
    // console.log(e.target);
    let timeWindow = e.target
    // console.log(timeWindow.classList.contains("time-window-active")) 
    // console.log(timeWindow.innerHTML) 

    if (!timeWindow.classList.contains("time-window-active")) {
      timeWindow.classList.add("time-window-active")
      if (timeWindow.innerHTML == "Today") {
        // console.log(1);
        timeWindow.nextElementSibling.classList.remove("time-window-active")
        this.getTrending("day")
      }
      else {
        // console.log(2);
        timeWindow.previousElementSibling.classList.remove("time-window-active")
        this.getTrending("week")
      }
    }
  }

}
