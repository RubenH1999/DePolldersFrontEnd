import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted : boolean = false;
  
  constructor(private _registerService: RegisterService, private router:Router) { }
  //wanneer de form gesubmit is zal er een nieuwe member worden aangemaakt in de databank
  onSubmit(){
    this.submitted = true;
    
    this._registerService.addMember(this.model).subscribe();
     this.router.navigate(['login']);
  }
  model: Member = new Member("","","");

  ngOnInit() {
  }

}
