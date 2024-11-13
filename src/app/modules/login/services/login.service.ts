import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    return this.http.post(`${API.ROOT}${API.CLIENTS}/login`, {email: email, contrasenya: password}).toPromise();
  }

  adminLogin(email: string, password: string): Promise<any> {
    return this.http.post(`${API.ROOT}${API.ADMIN}/login`, {email: email, contrasenya: password}).toPromise();
  }

  createAccount(user: User): Promise<any> {
    const params = {
      nombre: user.nombre,
      apellidos: user.apellidos,
      contrasenya: user.contrasenya,
      email: user.email
    }

    return this.http.post(`${API.ROOT}${API.CLIENTS}`, params).toPromise();
  }
}
