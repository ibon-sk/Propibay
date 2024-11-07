import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { API } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    getProfile(email: string): Promise<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.get(`${API.ROOT}${API.CLIENTS}`, { params }).toPromise();
    }

    updateProfile(user: User): Promise<any> {
        if (user.email !== undefined) { 
            const params: HttpParams = new HttpParams().set('email', user.email);
            const body = {
                nombre: user.name,
                apellidos: user.lastName,
                contrasenya: user.password
            };
            return this.http.put(`${API.ROOT}${API.CLIENTS}`, body, { params }).toPromise();
        } else {
            return Promise.reject('No email provided');
        }
    }

}
