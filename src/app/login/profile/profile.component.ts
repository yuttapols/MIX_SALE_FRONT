import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <div class="jumbotron">
      <h3 class="display-4">Hello, {{loggedInUser}}</h3>
      <p class="lead">Profile page will be live soon!</p>
      <hr class="my-4">
      <div class="alert alert-warning">
        <p>Sorry for the inconvenience, as it is under construction</p>
      </div>
        <p class="lead">
        <a class="btn btn-primary btn-lg" routerLink="/" role="button">Go Home</a>
      </p>
    </div>
  `,
  styles: [
  `
  `
  ]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loggedInUser = localStorage.getItem('token');
}
