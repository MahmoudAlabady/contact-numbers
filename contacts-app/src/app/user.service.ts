import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='http://localhost:3000/api/authenticate/'

  constructor(private http:HttpClient) { }
  authenticate(credentials: any) {
    return this.http.post(this.url,credentials);
  }
}
