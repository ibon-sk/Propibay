import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiRoot: string = 'http://localhost:3001';
  apiUrl: string = '/clientes';
  adminApiUrl: string = '/administradores';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${this.apiRoot}${this.apiUrl}/login`, {email: email, contrasenya: password}).toPromise();
  }

  adminLogin(email: string, password: string): Promise<any> {
    return this.http.post(`${this.apiRoot}${this.adminApiUrl}/login`, {email: email, contrasenya: password}).toPromise();
  }

  createAccount(user: User): Promise<any> {
    const params = {
      nombre: user.name,
      apellidos: user.lastName,
      contrasenya: user.password,
      email: user.email
    }

    return this.http.post(this.apiRoot + this.apiUrl, params).toPromise();
  }
}
