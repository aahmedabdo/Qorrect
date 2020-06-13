import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Services/login/loginservice.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'computek';
  isUserLoggedIn: boolean;
  UserToken = localStorage.token;
  constructor(private UserRout: Router, private loginservice: LoginService, private locat: Location) {
    //get variale from shared data for show header
    this.loginservice.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value
    });
    //check url if changed directry  set log out 
    if (locat.path() == '' || locat.path() == '/sign-in') {
      this.vlogOut();
    }
    else {
      this.loginservice.isUserLoggedIn.next(true);
    }
  }
  //log out function 
  vlogOut() {
    localStorage.clear();
    this.UserRout.navigate(['/']);
    this.loginservice.isUserLoggedIn.next(false);//for hidden header
  }
}