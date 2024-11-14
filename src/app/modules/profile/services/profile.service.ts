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

        return this.http.get(`${API.ROOT}${API.CLIENTS}/${email}`).toPromise();
    }

    updateProfile(user: User): Promise<any> {
        if (user.email !== undefined) { 
            const body = {
                email: user.email,
                nombre: user.nombre,
                apellidos: user.apellidos,
                contrasenya: user.contrasenya
            };
            return this.http.put(`${API.ROOT}${API.CLIENTS}/${user.email}`, body).toPromise();
        } else {
            return Promise.reject('No email provided');
        }
    }

    getMyApartments(email: string): Promise<any> {
        return this.http.get(`${API.ROOT}${API.PROPERTIES}/por/${email}`).toPromise();
    }

    getFavourites(email: string): Promise<any> {
        return this.http.get(`${API.ROOT}${API.CLIENTS}/${email}${API.FAVOURITES}`).toPromise();
    }

}
