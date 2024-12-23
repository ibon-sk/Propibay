import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginController {

  constructor(private service: LoginService) { }

  createAccount(user: User) {
    return this.service.createAccount(user);
  }

  login(email: string, password: string) {
    return this.service.login(email, password);
  }

  adminLogin(email: string, password: string) {
    return this.service.adminLogin(email, password);
  }
}
