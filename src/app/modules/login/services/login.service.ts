import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  mockUser = {
    email: '123456@unizar.es',
    password: 'Contraseña1'
  };

  mockAdmin = {
    email: '000001@unizar.es',
    password: 'Contraseña2'
  };

  constructor() { }

  login(email: string, password: string): Observable<number> {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return of(0);
    } else if (email === this.mockAdmin.email && password === this.mockAdmin.password) {
      return of(1);
    } else {
      return of(-1);
    }
  }
}
