import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../_models/location';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  url: string = 'http://localhost:5000/locations';
  isLoadingSubject = new BehaviorSubject(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLocations() {
    this.isLoadingSubject.next(true);
    return this.http.get<Location[]>(this.url).pipe(result => {
      this.isLoadingSubject.next(false);
      return result;
    })
  }
}
