import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url='http://localhost:3000/api/contacts/'

  constructor(private http:HttpClient) { }
  getContacts(params:any){
    return this.http.get(this.url,{ params });

  }

}
