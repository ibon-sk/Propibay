import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    const tokenCreationTime = localStorage.getItem('tokenCreationTime');
    const now = new Date().getTime();

    if (token && tokenCreationTime) {
      const tokenAge = now - parseInt(tokenCreationTime, 10);
      const oneHour = 60 * 60 * 1000;

      if (tokenAge < oneHour) {
        return true;
      } else {
        // Token has expired
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
