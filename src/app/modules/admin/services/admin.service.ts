import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    getAdmin(email: string): Observable<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.get(`${API.ROOT}${API.ADMIN}`, { params });
    }

    getAllUsers(): Observable<any> {
        return this.http.get(`${API.ROOT}${API.ADMIN}`);
    }

    blockUser(email: string): Observable<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.delete(`${API.ROOT}${API.ADMIN}/blockClient`, { params });
    }

}
