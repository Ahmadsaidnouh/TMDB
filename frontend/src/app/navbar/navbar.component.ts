import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search: boolean = true;
  isSmallMovieClicked: boolean = false;
  isSmallTVClicked: boolean = false;
  isSmallPeopleClicked: boolean = false;
  smallNavBtnToggle: boolean = false;
  smallProfileInfoToggle: boolean = false;
  largeProfileInfoToggle: boolean = false;
  isSignedIn: boolean = false;
  userName: string = '';
  user: any;

  constructor(private _AuthService: AuthService) { }
  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isSignedIn = true;
        this.user = this._AuthService.userData.getValue();
        this.user = this.user ? this.user.user : null;
        this.userName = this.user.userName;
      }
      else {
        this.isSignedIn = false;

      }
    })
  }

  signOut() {
    // this.smallProfileInfoToggle=!this.smallProfileInfoToggle;
    this._AuthService.signOut();
  }



}
