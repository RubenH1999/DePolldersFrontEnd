import { Component, OnInit, Input, Inject } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';
import { DashboardService } from '../dashboard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserHomeComponent, DialogData } from '../user-home.component';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-vote-poll',
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {
  @Input() poll : Poll;
  votes;
  constructor(private _dashboardService: DashboardService,public dialogRef: MatDialogRef<UserHomeComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
   }

  ngOnInit() {
  }
  //Verstuurd de stem naar de databank op basis van het antwoordID en de UserID
  castVote(answerID: number, userID:number){
    this._dashboardService.postVote(answerID, userID).subscribe(
      
    );
    //sluit de modal
    this.dialogRef.close();
  }
  //telt het aantal stemmen op basis van het antwoordID
 

}
