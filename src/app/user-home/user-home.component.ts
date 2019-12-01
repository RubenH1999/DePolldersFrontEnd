import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { PollUser } from 'src/app/models/pollUser.model';
import { Observable, Observer } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { Poll } from '../models/poll.model';
import { User } from '../models/user.model';
import { Member } from '../models/member.model';
import { Friendship } from '../models/friendship.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewPollComponent } from './new-poll/new-poll.component';

import { VotePollComponent } from './vote-poll/vote-poll.component';
import { Vote } from '../models/vote.model';

//geeft de data van de poll door naar het vote component voor de modal
export interface DialogData{
  poll;
}

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  polls : Observable<Poll[]>;
  submitted : boolean = false;
  receiverID : number;
  receivedRequests : Observable<Member[]>
  sentRequests: Observable<Member[]>
  selectedPoll: Poll = null;
  votes: Observable<Vote[]>
  
  constructor(private _dashboardService: DashboardService,private router: Router, public dialog: MatDialog) {
    
    //bij het laden van de pagine worden meteen de polls van de user opgehaald op basis van de UserID
    this.polls = this._dashboardService.getUserPolls(this.userID);
    console.log(this.polls);
    
    //Bij het laden van de pagina worden alle ontvangen vriendschaps verzoeken opgehaald op basis van de USerID van de inglogde gebruiker
    this.receivedRequests = this._dashboardService.getFriendRequest(this.userID);
    console.log(this.receivedRequests);
    this.sentRequests = this._dashboardService.getSentRequest(this.userID);
    this.votes = this._dashboardService.countVotes(this.answerID);
    console.log(this.votes)
  }
  //Controleert of er een gebruiker in de databank is met het ingegeven email, zo ja word het vriendschapsverzoek verzonden naar de persoon met dat email
  onSearch(){
    this._dashboardService.getUserByEmail(this.searchUser).subscribe(result => {
      console.log(result);
      this.receiverID = result['userID']
      this._dashboardService.postFriendRequest(0,this.userID,this.receiverID).subscribe();
    });
  }
  //Decinded de invite van een persoon en verwijderd deze dan ook uit de databank
  declineInvite(friendshipID : number){
    this._dashboardService.deleteFriendship(friendshipID).subscribe();
  }
  //accepteerd het vriendschapsverzoek en zal de vriendschap updaten in de databank
  acceptInvite(friendshipID: number, friendship: Friendship){
    friendship['status'] = 1;
    this._dashboardService.acceptInvite(friendshipID,friendship).subscribe();
  }
  
  //opent de modal voor het maken van een nieuwe poll
  openDialog(): void {
    
    const dialogRef = this.dialog.open(NewPollComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
//Opent de modal om te stemmen
  openVote(p: Poll):void{
    
    console.log(p);
    const dialogRef = this.dialog.open(VotePollComponent, {width:'250px', 
    data: {poll: p}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
  }
  //logt de gebruiker uit en maakt de localstorage clear zodat er geen Token of userID meer aanwezig is
  logout(){
    localStorage.clear();
  }
  
  ngOnInit() {
    
    
  }
//Haalt die userID op
  userID: number = this._dashboardService.getCurrentUser();
  searchUser: string;
  
  answerID: number;
}
