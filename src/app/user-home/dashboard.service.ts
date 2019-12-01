import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poll } from '../models/poll.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { PollUser } from '../models/pollUser.model';
import { Member } from '../models/member.model';
import { User } from '../models/user.model';
import { Friendship } from '../models/friendship.model';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  //haalt de polls op die de ingelogde gebruiker heeft aangemakat of is voor uitgenodigd
  getUserPolls(userID: number):Observable<Poll[]>{
    return this.http.get<Poll[]>("https://localhost:44311/api/pollusers/getuserpolls/"+userID);
  }
  //Kijgt of de ingegeven email gelinkt is aan een bestaand account
  getUserByEmail(email : string){
    return this.http.get("https://localhost:44311/api/Users/getUserByEmail/" + email);
  }
  //Maakt een nieuw vriendscahps verzoek aan in de databank status = 0 wanneer het verzoek pending is sentID is de userID van degene die het verzoek heeft verzonden receiverID is de userID van de persoon die het verzoek ontvangt
  postFriendRequest(status: number, sentID: number, receiverID: number){
    return this.http.post("https://localhost:44311/api/Friendships/sendRequest/"+ status + "/" + sentID + "/" +receiverID,null);
  }
  //Haalt de vriendschapsverzoeken op voor de ingelogde gebruiker
  getFriendRequest(userID : number):Observable<Member[]>{
    return this.http.get<Member[]>("https://localhost:44311/api/Friendships/receivedRequest/"+userID);
  }
  getSentRequest(userID : number):Observable<Member[]>{
    return this.http.get<Member[]>("https://localhost:44311/api/Friendships/SentRequest/"+userID);
  }
  //Wanneer eeen vriendschapsverzoek word afgewezen zal dit op basis van de friendshipID de vriendschap uit de databank verwijderen
  deleteFriendship(friendshipID:number){
    return this.http.delete<Friendship>("https://localhost:44311/api/friendships/"+friendshipID)
  }
  //wanneer een invite word geaccepeerd zal een vriendschap worden geupdate op basis van een friendshipID en zal de status naar 1 gezet worden
  acceptInvite(friendshipID: number, friendship: Friendship){
    return this.http.put<Friendship>("https://localhost:44311/api/friendships/"+friendshipID, friendship);
  }
  //stuurt de data van de stem door naar de databank aan de hand van het answerID
  postVote(answerID: number, userID: number){
    return this.http.post("https://localhost:44311/api/votes/addvote/"+answerID+"/"+userID,null);
  }
  //haalt de votes op op basis van het answerID om zo de tussenstand te kunnen berekenen
  getVotes(answerID : number){
    return this.http.get("https://localhost:44311/api/answers/countVotes/"+answerID);
  }
  countVotes(answerID : number):Observable<Vote[]>{
    return this.http.get<Vote[]>("https://localhost:44311/api/votes/countVotes/"+answerID);
  }
  //haalt de ID op van de current user uit de localstorage
  getCurrentUser(){
    let userID = localStorage.getItem("id");
    console.log(userID)
    return JSON.parse(userID);
  }
}
