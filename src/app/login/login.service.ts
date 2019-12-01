import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Member } from '../models/member.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedin = new BehaviorSubject(false);
  constructor(private hhtp: HttpClient) { }
  //Controleert of er een Member is met de ingegeven data op de login form
  authenticate(user: User): Observable<Member>{
    return this.hhtp.post<Member>("https://localhost:44311/api/Authentication/authenticate", user);
  }
}

