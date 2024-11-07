import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../shared/models/property';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    apiUrl: string = '/properties';

    constructor(private http: HttpClient) { }

    getProperty(id: number): Observable<any> {
        const params: HttpParams = new HttpParams().set('id', id.toString());

        return this.http.get<Property>(this.apiUrl, { params });
    }

    addToFavourites(email: string, propertyId: number) {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.post(this.apiUrl + '/favourites', {ID: propertyId}, { params });
    }

}
