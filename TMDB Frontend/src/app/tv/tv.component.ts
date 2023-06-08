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

  displayTvShowDetails(movieId: string, movieTitle: string) {
    let title = movieTitle.toLowerCase().replaceAll("!", "").replaceAll(":", "").replaceAll(" ", "-")
    this._Router.navigate([`tvDetails/${movieId}-${title}`]);
  }

  getTvShows(tv_option:string, pageNumber:number) {
    this._TmdbService.getTvShows(tv_option, pageNumber).subscribe((response) => {

      this.tvShows.push(...response.results);

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
    this.getTvShows(this.category, this.pageNumber);
  }
}
