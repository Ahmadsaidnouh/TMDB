import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error = false;
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(`^[A-Z0-9][a-z0-9]{3,}`)]),
    cPassword: new FormControl(null, [Validators.required]),
  });

  constructor(public _AuthService: AuthService, public _Router: Router) { }

  ngOnInit(): void {

  }

  submitRegisterForm(registerForm: FormGroup) {
    
    console.log(registerForm.valid, "valid = ")
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          this.error = false;
          if (response.message == "Success") {
            this._Router.navigate(['signIn'])
          }
        },
        error: (error) => {
          this.error = true;
        }
      })
    }

  }
}
