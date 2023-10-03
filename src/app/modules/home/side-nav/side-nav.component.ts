import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  role : string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getRole();
  }

  public getRole() {
    this.role = sessionStorage.getItem("user_role") || '';
  }

  logOut() {
    sessionStorage.removeItem('user_role');
    sessionStorage.removeItem('user_id');
    this.router.navigate(['home/homepage']).then(() => {
      window.location.reload()
    });
  } 
}
