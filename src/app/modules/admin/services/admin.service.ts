import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    apiUrl: string = '/clientes';
    adminApiUrl: string = '/administradores';

    constructor(private http: HttpClient) { }

    getAdmin(email: string): Observable<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.get(this.adminApiUrl, { params });
    }

    getAllUsers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    blockUser(email: string): Observable<any> {
        const params: HttpParams = new HttpParams().set('email', email);

        return this.http.delete(this.adminApiUrl + '/blockClient', { params });
    }

}
