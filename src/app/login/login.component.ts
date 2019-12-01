import { Component, OnInit } from '@angular/core';
import { User} from '../models/user.model'
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted : boolean = false;

  constructor(private _loginService: LoginService, private router:Router) { }
  //suibmit de form
  onSubmit(){
    this.submitted = true;
    //controleert of er een gerbuiker is waarvan de ingevulgde gegevens overeen komen
    this._loginService.authenticate(this.model).subscribe(result => {
      console.log(result);
      this._loginService.isLoggedin.next(result['token'] ? true : false);
      //als er een gebruiker is met de ingegeven data zal de token en de USerID in de localstorage worden gezet
      localStorage.setItem("token", result['token']);
      localStorage.setItem("id", result['userID']);
      //stuurt de gebruiker naar de dashboardpagina
      this.router.navigate(['user-home']);
    })
    

    
    
  }
  model: User = new User("","");
  

  ngOnInit() {
  }

}
