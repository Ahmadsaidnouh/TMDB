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
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  ngOnInit(): void {
    setTimeout(()=> {
      this.isValid = true;      
    }, 1500)

    this.authService.authState.subscribe((user) => {
      console.log(this.isValid);
      if (!this.isValid) {
        return
      }
      
      this.user = user;
      console.log(user);
      let uu = {
        googleResponse: user
      }

      this._AuthService.signInGoogle(uu).subscribe({
        next: (response) => {
          console.log(response);

          this.error = '';
          if (response.message == "Success") {
            localStorage.setItem("userToken", response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['home'])
          }
        },
        error: (error) => {
          this.error = error.error.message;
        } 
      })
      this.loggedIn = (user != null);
    });
  }

  submitSignInForm(signInForm: FormGroup) {

    if (signInForm.valid) {
      this._AuthService.signIn(signInForm.value).subscribe({
        next: (response) => {
          console.log(response);

          this.error = '';
          if (response.message == "Success") {
            localStorage.setItem("userToken", response.token);
            this._AuthService.saveUserData();
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
