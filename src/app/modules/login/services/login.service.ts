import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = '/clientes';

  mockUser = {
    email: '123456@unizar.es',
    password: 'Contraseña1'
  };

  mockAdmin = {
    email: '000001@unizar.es',
    password: 'Contraseña2'
  };

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return of('token');
    } else if (email === this.mockAdmin.email && password === this.mockAdmin.password) {
      return of('adminToken');
    } else {
      return this.http.post(this.apiUrl, {email: email, contrasenya: password});
    }
  }

  createAccount(user: User): Observable<any> {
    const name = user.name;
    const lastName = user.lastName;
    const email = user.email;
    const password = user.password;
    return this.http.post(this.apiUrl, {nombre: name, apellidos: lastName, contrasenya: password, email: email});
  }
}
