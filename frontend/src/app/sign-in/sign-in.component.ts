import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: any;
  loggedIn: boolean = false;
  isValid: boolean = false;

  displaySignInForm = false;
  error = '';
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z0-9][a-z0-9]{3,}`)]),
  });

  constructor(public _AuthService: AuthService, public _Router: Router, private authService: SocialAuthService) { }
  signInWithGoogle(): void {
    // console.log("Goooooogle is clicked");
    // this.bodyIsTouched = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnInit(): void {
    // to prevent automatic google sign in  
    setTimeout(()=> {
      this.isValid = true;      
    }, 1500)
    // document.querySelector("asl-google-signin-button")?.addEventListener("click", () => {
    //   this.bodyIsTouched = true;
    //   console.log("google clicked");

    // })
    // let mainBody = document.querySelector(".main-section");
    // Check if the section is clicked
    // mainBody?.addEventListener("click", () => {
    //   console.log("Section is clicked");
    //   this.bodyIsTouched = true;
    // });
    // // Check if the section is touched (on mobile devices)
    // mainBody?.addEventListener("touchstart", () => {
    //   console.log("Section is touched");
    //   this.bodyIsTouched = true;
    // });
    // // Check if the section is dragged
    // mainBody?.addEventListener("drag", () => {
    //   console.log("Section is dragged");
    //   this.bodyIsTouched = true;
    // });
    // // Check if the section is scrolled
    // mainBody?.addEventListener("scroll", () => {
    //   console.log("Section is scrolled");
    //   this.bodyIsTouched = true;
    // });

    this.authService.authState.subscribe((user) => {
      console.log(this.isValid);
      if (!this.isValid) {
        return
      }
      
      this.user = user;
      console.log(user);
      //       email
      // : 
      // "ahmedsaid2369@gmail.com"
      // firstName
      // : 
      // "Ahmad"
      // id
      // : 
      // "103885283837653122112"
      // idToken
      // : 
      // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM5YWZkYTM2ODJlYmYwOWViMzA1NWMxYzRiZDM5Yjc1MWZiZjgxOTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODI5ODc1NjksImF1ZCI6IjUxMjc2MDMzNjM1OS1zbGdlM2o2ZDY4cGJvdWhtODdvczZiYmVvdWFmZmpicC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzg4NTI4MzgzNzY1MzEyMjExMiIsImVtYWlsIjoiYWhtZWRzYWlkMjM2OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNTEyNzYwMzM2MzU5LXNsZ2UzajZkNjhwYm91aG04N29zNmJiZW91YWZmamJwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkFobWFkIFNhaWQgTm91aCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhZSm1JYkt0U3ZmWFdadTZVdElEQ0NHMkF1bVNzSlM3cURtbkFUYz1zOTYtYyIsImdpdmVuX25hbWUiOiJBaG1hZCIsImZhbWlseV9uYW1lIjoiU2FpZCBOb3VoIiwiaWF0IjoxNjgyOTg3ODY5LCJleHAiOjE2ODI5OTE0NjksImp0aSI6IjUxZDg5MTk5YzY2ZTdmNTIxYjc0ZjBiMDNkMTYyMmI0MmJlZDdhMGMifQ.BiKfAWZLzE82wEEgFinNo8klVwFLyMH7xlwIECKYjWgZkcCu92y3VF67cCvFafI94VILMsQoyLZmvinYXpsUc5iArE9rjQ4u3G2eYsXCo8SWv7uTsjuAJFl4V7rDjyi8HY3M38eG2NC1s_uj3zBz38p877GzkiCkPe52btKpvTiNbtJfeHMzvRMgQB1-lSufwJoas6NvxK9rKtiD2_SHu8NITtZR8IzLLpVEckKmSm-ZDtp1_4MS2gZs9ryFd5x1QTjk8RN7C-U8DOtibxjMCdzbI4N9b4YZwp53077byPT6n_P29CoWGoQM8f98-pabmtKAE9qnWqCkRMsS94VuyA"
      // lastName
      // : 
      // "Said Nouh"
      // name
      // : 
      // "Ahmad Said Nouh"
      // photoUrl
      // : 
      // "https://lh3.googleusercontent.com/a/AGNmyxYJmIbKtSvfXWZu6UtIDCCG2AumSsJS7qDmnATc=s96-c"
      // provider
      // : 
      // "GOOGLE"
      let uu = {
        googleResponse: user
      }
      // console.log("is google clicked = ", this.bodyIsTouched);

      this._AuthService.signInGoogle(uu).subscribe({
        next: (response) => {
          console.log(response);

          this.error = '';
          if (response.message == "Success") {
            localStorage.setItem("userToken", response.token);
            this._AuthService.saveUserData();
            // console.log("success");
            this._Router.navigate(['home'])
          }
        },
        error: (error) => {
          this.error = error.error.message;
        } 
      })
      this.loggedIn = (user != null);
      // this.bodyIsTouched = false;
    });
  }

  submitSignInForm(signInForm: FormGroup) {

    // console.log(signInForm.valid, "valid = ")
    // console.log(signInForm);
    if (signInForm.valid) {
      this._AuthService.signIn(signInForm.value).subscribe({
        next: (response) => {
          console.log(response);

          this.error = '';
          if (response.message == "Success") {
            localStorage.setItem("userToken", response.token);
            this._AuthService.saveUserData();
            // console.log("success");
            this._Router.navigate(['home'])
          }
        },
        error: (error) => {
          this.error = error.error.message;
        }
      })
    }

  }
}
