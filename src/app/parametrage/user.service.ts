import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getutilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl +`/Users/utilisateur`);
  }
  getclients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + `/Users/client`);
  }
  deleteuser(id : number){
    return this.http.delete(`${this.baseUrl}/Users/${id}`)
  }
  
  updateuser(id : number, user : User){
    return this.http.put(`${this.baseUrl}/Users/${id}`, user)
  }
  adduser(user : User){
    return this.http.post(`${this.baseUrl}/Users`, user)
  }
}