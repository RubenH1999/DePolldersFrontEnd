import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  //maakt een nieuwe gebruiker aan op basis van de ingegeven informatie in de form
  addMember(member : Member): Observable<Member>{
    return this.http.post<Member>("https://localhost:44311/api/users", member);
  }
}
