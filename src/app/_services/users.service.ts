import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user.js';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }


}
