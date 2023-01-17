import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: any = localStorage.getItem('token');
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Authorization': token,
        'x-peets-source': 'commodo id in'
      })
    });
    return next.handle(authReq);
  }
}

        

