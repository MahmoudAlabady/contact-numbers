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
  
  addContact(body: any){
    return this.http.post(this.url,body)
  }
  updateContact(id:any,data:any){
    return this.http.put(this.url+id,data)
  }
  deleteContact(id:string){
    return this.http.delete(this.url+id)

  }
}
