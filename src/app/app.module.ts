import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import {LoginService} from '../app/login/login.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { RegisterComponent } from './register/register.component'
import { RegisterService } from './register/register.service';
import { NewPollComponent } from './user-home/new-poll/new-poll.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VotePollComponent } from './user-home/vote-poll/vote-poll.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import { from } from 'rxjs';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input'; 

import {MatFormFieldModule} from '@angular/material/form-field'; 




const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new-poll', component: NewPollComponent},
  {path: 'vote-poll', component: VotePollComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    
    
    LoginComponent,
    UserHomeComponent,
    RegisterComponent,
    NewPollComponent,
    VotePollComponent,
    
    
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService,RegisterService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
