import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
// import jwt from "jsonwebtoken";
// client id = 512760336359-slge3j6d68pbouhm87os6bbeouaffjbp.apps.googleusercontent.com
// client secret = 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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if(localStorage.getItem("userToken") != null) {
      this.saveUserData()
    }
  }

  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem("userToken"));
    console.log("encodedUserData = "+ encodedUserData);
    
    this.userData.next(jwtDecode(encodedUserData));
    console.log(jwtDecode(encodedUserData));   
  }

  signOut() {
    let currentComponentName = this._Router.url.replace("/","")
    // console.log("link = " + currentComponentName);
    localStorage.removeItem("userToken")
    this.userData.next(null);
    this._Router.navigate(["home"]);
    // if (currentComponentName == "settings" ....)
    
  }

  register(formData:object): Observable<any> {
    return this._HttpClient.post('https://tmdb-backend.vercel.app/user/signUp', formData)
  }
  signIn(formData:object): Observable<any> {
    return this._HttpClient.post('https://tmdb-backend.vercel.app/user/signIn', formData)
  }
  signInGoogle(formData:object): Observable<any> {
    return this._HttpClient.post('https://tmdb-backend.vercel.app/user/signInGoogle', formData)
  }
}
