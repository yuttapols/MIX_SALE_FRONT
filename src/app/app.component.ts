import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hi there, Login Angular';
  constructor(private router : Router){ }
  loggedInUser:string;

  loggedIn(){
    this.loggedInUser = localStorage.getItem('token');
    return this.loggedInUser;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    alertify.success('Successfully Logged out');
  }
}
