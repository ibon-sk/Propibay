import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminToken');
    const tokenCreationTime = localStorage.getItem('tokenCreationTime');
    const now = new Date().getTime();
    if (token && tokenCreationTime) {
      const tokenAge = now - parseInt(tokenCreationTime, 10);
      const oneHour = 60 * 60 * 1000;

      if (tokenAge < oneHour) {
        return true;
      } else {
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
