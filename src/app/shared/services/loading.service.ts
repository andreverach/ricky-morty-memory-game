import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isProgressLoading$: Subject<boolean> = new Subject<boolean>();
  private isSpinnerLoading$: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  showProgressBar(){
    this.isProgressLoading$.next(true);
  }

  hideProgressBar(){
    this.isProgressLoading$.next(false);
  }

  get isSpinnerLoading(){
    return this.isSpinnerLoading$.asObservable();
  }

  showSpinnerLoading(){
    this.isSpinnerLoading$.next(true);
  }

  hideSpinnerLoading(){
    this.isSpinnerLoading$.next(false);
  }

}
