import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    apiUrl: string = '/clientes';

    constructor(private http: HttpClient) { }

    getProfile(email: string): Observable<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.get(this.apiUrl, { params });
    }

    updateProfile(user: User): Observable<any> {
        if (user.email !== undefined) { 
            const params: HttpParams = new HttpParams().set('email', user.email);
            const body = {
                nombre: user.name,
                apellidos: user.lastName,
                contrasenya: user.password
            };
            return this.http.put(this.apiUrl, body, { params });
        } else {
            return of(-1);
        }
    }

}
