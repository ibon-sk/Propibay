import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property } from '../../shared/models/property';
import { API } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    
    constructor(private http: HttpClient) { }

    getProperties(): Promise<any> {
        return this.http.get<Property[]>(`${API.ROOT}${API.PROPERTIES}`).toPromise();
    }
}
