import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginController {

  constructor(private loginService: LoginService) { }

  login(email: string, password: string): Observable<string> {
    return this.loginService.login(email, password);
  }
}
