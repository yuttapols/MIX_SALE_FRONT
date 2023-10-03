import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){ }

  canActivate(): boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    else{
      alertify.error('You must login first to continue.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
