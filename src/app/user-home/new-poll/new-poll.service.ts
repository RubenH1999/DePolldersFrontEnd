import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { User } from 'src/app/models/user.model';
import { Poll } from 'src/app/models/poll.model';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { PollUser } from 'src/app/models/pollUser.model';
import { Friendship } from 'src/app/models/friendship.model';

@Injectable({
  providedIn: 'root'
})
export class NewPollService {

  constructor(private http: HttpClient) { }
  //Stuurt de ingegeven data van de poll door naar de databank
  createPoll(poll: Poll): Observable<Poll>{
    return this.http.post<Poll>("https://localhost:44311/api/polls", poll);
  }
  //stuurt de ingegeven mogelijke antwoorden door naar de databank
  addAnswer(pollID: number, answer: string){
    return this.http.post("https://localhost:44311/api/answers/" +pollID  +"/" + answer.toString(),null);
  }
  //voegt een gebruiker van de poll toe word gebruikt zowel wanneer een poll word aangemaakt als wanneer iemand word geinvite voor een poll
  addPollUser(userID: number, pollID: number){
    return this.http.post("https://localhost:44311/api/pollusers/addPollUser/"+userID + "/" + pollID, null);
  }
  //haalt de vrienden op uit de databank om ze te kunnen inviten
  getFriends(userID:number):Observable<Friendship[]>{
    return this.http.get<Friendship[]>("https://localhost:44311/api/friendships/getFriends/"+userID);
  }
  getSentFriends(userID:number):Observable<Friendship[]>{
    return this.http.get<Friendship[]>("https://localhost:44311/api/friendships/getSentFriends/"+userID);
  }
  //haalt de UserId van de current user op
  getCurrentUser(){
    let userID = localStorage.getItem("id");
    console.log(userID)
    return JSON.parse(userID);
  }


}
