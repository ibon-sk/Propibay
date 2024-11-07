import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Property } from '../../shared/models/property';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    apiRoot: string = 'http://localhost:3001';
    apiUrl: string = '/propiedades';
    
    constructor(private http: HttpClient) { }

    getProperties(): Promise<any> {
        return this.http.get<Property>(this.apiRoot + this.apiUrl).toPromise();
    }
}
