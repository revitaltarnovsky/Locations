import { Injectable } from '@angular/core';
import { Car } from '../_models/car';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url: string = 'http://localhost:4000/cars';
  isLoadingSubject = new BehaviorSubject(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCars() {
    this.isLoadingSubject.next(true);
    return this.http.get<Car[]>(this.url).pipe(result => {
        this.isLoadingSubject.next(false);
        return result;
    });
  }
}
