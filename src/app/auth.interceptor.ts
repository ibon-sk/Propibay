import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken')
    const adminToken = localStorage.getItem('adminToken');
    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', `Bearer ${authToken}`)
      });
      return next.handle(cloned);
    } else if (adminToken) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', `Bearer ${adminToken}`)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}