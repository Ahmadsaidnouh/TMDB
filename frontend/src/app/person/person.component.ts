import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  pageNumber: number = 1;
  isSignedIn: boolean = false;
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  people: any[] = [];

  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {
    
    this.getPeople(this.pageNumber)
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

  displayPersonDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`personDetails/${movieId}-${title}`]);
  }

  getPeople(pageNumber:number) {
    this._TmdbService.getPeople(pageNumber).subscribe((response) => {

      this.people.push(...response.results);
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
  loadMore() {
    this.pageNumber++;
    this.getPeople(this.pageNumber);
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
