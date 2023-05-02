import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {
  pageNumber: number = 1;
  category: string = "";
  categoryName: string = "";
  isSignedIn: boolean = false;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  tvShows: any[] = [];

  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params: any) => {
      let param = params.get('category');
      console.log(param);
      
      if (param == "popular" || param == null) {
        this.category = "popular"
        this.categoryName = "Popular TV Shows"
      }
      else if (param == "top-rated") {
        this.category = "top_rated"
        this.categoryName = "Top Rated TV Shows"
      }
      else if (param == "on-tv") {
        this.category = "on_the_air"
        this.categoryName = "Currently Airing TV Shows"
      }
      else if (param == "airing-today") {
        this.category = "airing_today"
        this.categoryName = "TV Shows Airing Today"
      }

      console.log(this.category);
      this.tvShows = []
      this.getTvShows(this.category, this.pageNumber)
    });
    // let param = this._ActivatedRoute.snapshot.paramMap.get("category")?.replace("-", "_");
    // console.log(this._ActivatedRoute.snapshot.paramMap.get("category"));
    // this._Router
    // this.getTvShows(this.category, this.pageNumber)
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

  displayTvShowDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`tvDetails/${movieId}-${title}`]);
  }

  getTvShows(tv_option:string, pageNumber:number) {
    this._TmdbService.getTvShows(tv_option, pageNumber).subscribe((response) => {

      this.tvShows.push(...response.results);
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
    this.getTvShows(this.category, this.pageNumber);
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
  //     this.getTvShows("day")
  //   }
  //   else {
  //     // console.log(2);
  //     timeWindow.previousElementSibling.classList.remove("time-window-active")
  //     this.getTvShows("week")
  //   }
  // }
  // }
}
