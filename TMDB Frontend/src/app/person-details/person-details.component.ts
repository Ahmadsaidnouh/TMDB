import { Router, ActivatedRoute } from '@angular/router';
import { TmdbService } from './../tmdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent  implements OnInit {
  personId:string = '';
  isSignedIn: boolean = false;
  bgImgPrefix: string = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';
  person: any = {};
  constructor(private _TmdbService: TmdbService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params: any) => {
      let param = params.get('slug')?.split("-")[0];
      
      this.personId = param;

      this.getPersonDetails(this.personId)
      
    });

  }

  getPersonDetails(personId:string) {
    this._TmdbService.getPersonDetails(personId).subscribe((response) => {
      this.person = response
      console.log(response);
      

    })
  }
  getReleaseYear() {
    return this.person.first_air_date?.split('-')[0];
  }
  ceil() {
    return Math.ceil(this.person?.vote_average*10)
  }
  getReleaseDate() {
    try {
      let date = this.person.first_air_date?.split('-');
      let reform = date[2] + '/' + date[1] + '/' + date[0];
      return reform
    } catch (error) {
      return ""
    }
  }
  getGenres() {
    try {
      let genres = this.person.genres;
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
      let runtime = this.person.episode_run_time[0];
      
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
