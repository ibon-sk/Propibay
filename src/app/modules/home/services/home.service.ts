import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Property } from '../../shared/models/property';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    apiUrl: string = '/propiedades';

    mockedOffers: Property[] = [
        {
            id: 1,
            image: undefined,
            title: 'Apartamento en venta',
            description: 'Departamento en venta en la colonia Roma',
            type: 1,
            offerType: 1,
            rooms: 3,
            baths: 2,
            price: 1000000,
        },
        {
            id: 2,
            image: undefined,
            title: 'Casa en alquiler',
            description: 'Casa en alquiler en la colonia Condesa',
            type: 2,
            offerType: 2,
            rooms: 4,
            baths: 3,
            price: 15000,
        },
        {
            id: 3,
            image: undefined,
            title: 'Apartamento en venta',
            description: 'Departamento en venta en la colonia Polanco',
            type: 1,
            offerType: 1,
            rooms: 2,
            baths: 1,
            price: 2000000,
        },
    ];
    
    constructor(private http: HttpClient) { }

    getProperties(): Observable<Property[]> {
        return of(this.mockedOffers); 
        //return this.http.get<Offer>(this.apiUrl);
    }

    getProperty(id: number): Observable<any> {
        return of(this.mockedOffers.find(offer => offer.id === id));
        //return this.http.get<Offer>(`${this.apiUrl}/${id}`);
    }

    getPropertyByFilter(filter: string): Observable<Property[]> {
        return of(this.mockedOffers.filter(offer => offer.title?.toLowerCase().includes(filter.toLowerCase())));
        //return this.http.get<Offer>(`${this.apiUrl}?filter=${filter}`);
    }


}
