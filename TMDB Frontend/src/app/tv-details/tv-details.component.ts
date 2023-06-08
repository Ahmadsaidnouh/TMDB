import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent  implements OnInit {
  tvId:string = '';
  isSignedIn: boolean = false;
  bgImgPrefix: string = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  tvShow: any = {};
  photo = '';
  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params: any) => {
      let param = params.get('slug')?.split("-")[0];
      
      this.tvId = param;

      this.getTvDetails(this.tvId)
      
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


  getTvDetails(tvId:string) {
    this._TmdbService.getTvDetails(tvId).subscribe((response) => {
      this.tvShow = response
      this.photo = this.bgImgPrefix + this.tvShow.backdrop_path;
      console.log(response);

    })
  }
  getReleaseYear() {
    return this.tvShow.first_air_date?.split('-')[0];
  }
  ceil() {
    return Math.ceil(this.tvShow?.vote_average*10)
  }
  getReleaseDate() {
    try {
      let date = this.tvShow.first_air_date?.split('-');
      let reform = date[2] + '/' + date[1] + '/' + date[0];
      return reform
    } catch (error) {
      return ""
    }
  }
  getGenres() {
    try {
      let genres = this.tvShow.genres;
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
      let runtime = this.tvShow.episode_run_time[0];
      
      let hours = Math.floor(runtime / 60)
      
      let min = runtime - hours*60
      if(isNaN(hours)) {
        return ''
      }
      return (hours == 0 ? (min + 'm') : (hours+'h ' + min + 'm'));
    } catch (error) {
      return ''
    }
  }
}
