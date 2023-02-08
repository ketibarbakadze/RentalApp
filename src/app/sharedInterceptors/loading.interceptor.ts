import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { LoadingService } from '../sharedServices/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingService) {}

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.handle(request.urlWithParams, true);
    return next
      .handle(request)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          this.loader.handle(error.url, false);
          return error;
        })
      )
      .pipe(
        map((evt: any) => {
          if (evt instanceof HttpResponse) {
            this.loader.handle(evt.url!, false);
          }
          return evt;
        })
      );
  }
}
