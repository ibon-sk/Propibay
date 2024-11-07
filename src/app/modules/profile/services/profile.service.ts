import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    apiUrl: string = '/clientes';

    constructor(private http: HttpClient) { }

    getProfile(email: string): Observable<any> {
        return this.http.get(this.apiUrl + '/' + email);
    }

    updateProfile(user: User): Observable<any> {
        const name = user.name;
        const lastName = user.lastName;
        const email = user.email;
        const password = user.password;

        return this.http.put(this.apiUrl + '/' + email, {nombre: name, apellidos: lastName, contrasenya: password, email: email});
    }

}
