import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {

    const userRole = sessionStorage.getItem('user_role');
    if (null != userRole && userRole == "admin") {
      this.router.navigate(['home/homepageaddmin'])

    } else {
      this.router.navigate(['home/homepage'])
    }
  }



}
