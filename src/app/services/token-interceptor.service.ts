import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.storage.getLocal<string>('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storage.getLocal('token')}`,
        },
      });
    }
    return next.handle(request);
  }
}
