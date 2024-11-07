import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = '/clientes';
  adminApiUrl: string = '/administradores';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return of('authToken'); //this.http.post(this.apiUrl + '/login', {email: email, contrasenya: password});
  }

  adminLogin(email: string, password: string): Observable<any> {
    return of('adminToken'); //this.http.post(this.adminApiUrl + '/login', {email: email, contrasenya: password});
  }

  createAccount(user: User): Observable<any> {
    const params = {
      nombre: user.name,
      apellidos: user.lastName,
      contrasenya: user.password,
      email: user.email
    }

    return this.http.post(this.apiUrl, params);
  }
}
