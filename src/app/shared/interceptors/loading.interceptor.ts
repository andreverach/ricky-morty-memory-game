import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { LoadingService } from '@shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor{

  constructor(
    private loadingService: LoadingService
  ) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showProgressBar();
    this.loadingService.showSpinnerLoading();
    return next.handle(request)
            .pipe(
              finalize(() => {
                this.loadingService.hideProgressBar();
                this.loadingService.hideSpinnerLoading();
              })
            );
  }
}
