import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any;

  constructor(private _AuthService: AuthService) { }
  
  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      this.user = this._AuthService.userData.getValue();
      this.user = this.user ? this.user.user : null;
      console.log("user = ", this.user);
    })
  }

  getJoinDate() {
    let year = this.user.createdAt.split('-')[0];
    let month = this.getMonthName(Number(this.user.createdAt.split('-')[1]))
    return month + ' ' + year;
  }
  getMonthName(monthNumber: number): string {
    const monthNames: string[] = [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ];
    
    // Subtract 1 from the month number to get the index in the monthNames array
    const monthIndex: number = monthNumber - 1;
    
    // Return the name of the month
    return monthNames[monthIndex];
  }
  getUserName() {
    let str = this.user.userName;
    if (str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  
  
}
