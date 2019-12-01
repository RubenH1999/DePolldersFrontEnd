import { Component, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { Answer } from 'src/app/models/answer.model';
import { NewPollService } from './new-poll.service';
import { PollUser } from 'src/app/models/pollUser.model';
import { Friendship } from 'src/app/models/friendship.model';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MatDialog, MatDialogConfig,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserHomeComponent} from '../user-home.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'; 
@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
  
  pollUsers : PollUser[];
  submitted : boolean = false;
  friends : Observable<Friendship[]>;
  invitefriend =[];
  answers = [];
  sentFriends: Observable<Friendship[]>;
  
  constructor(private _newPollService: NewPollService,public dialogRef: MatDialogRef<UserHomeComponent>) {
    //haalt de vrienden op van zodra de modal geopend word
      this.friends =  _newPollService.getFriends(this.userID);
     this.sentFriends = _newPollService.getSentFriends(this.userID);
      
   }
  onSubmit(){
    
    this.submitted = true;
    //poll zal worden aangemaakt in de databank aan de hand van de meegegeven model (poll)
    this._newPollService.createPoll(this.model).subscribe(result => {
      //PollID word opgehaald om deze mee te kunnen geven aan de antwoorden zodat de antwoorden bij de juiste poll komen zowel voor wanneer een vriend geinvite word
      let pollID = result['pollID']
      console.log(pollID);
      console.log(result['naam']);
      //voegt elk opgegeven antwoord toe aan de databank op 
      this.answers.forEach(a => {
        this._newPollService.addAnswer(pollID,a).subscribe();
      })
      
      this._newPollService.addPollUser(this.userID, pollID).subscribe();
      //Voegt de geinvite vrienden toe zodat ze de poll kunnen gebruiken
      this.invitefriend.forEach(f => {
        let i = 0;
        this._newPollService.addPollUser(f,pollID).subscribe();
        i++
      })
      this.dialogRef.close();
    }
    
      );
      
    
  }
  //pusht de geinvite vrienden naar een array waar ze allemaal tijdelijk worden in opgeslagen tot de creatie van de nieuwe poll gereed is 
  inviteFriend(userID : number){
    this.invitefriend.push(userID);
    console.log(this.invitefriend);
  }
  //Pusht het opgegeven antwoord naar een array waar ze tijdelijk opgeslagen worden toto de de form word gesubmit
  addAnswer(text: string){
    this.answers.push(text);
    console.log(this.answers);
  }
  
  ngOnInit() {
    
  }
  model: Poll = new Poll(0,"");
  answer: Answer = new Answer(0,"",0);
  
  userID: number = this._newPollService.getCurrentUser();
  
}
