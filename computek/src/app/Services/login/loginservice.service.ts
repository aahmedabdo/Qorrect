import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Global } from '../../Global/GlobalUrl'
import { Observable, BehaviorSubject } from 'rxjs';
import { Login } from '../../Interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  GlobalUrl = Global.urls.GlobalUrl;

  //Joins
  LoginUrl = 'api/login';

  constructor(private http: HttpClient) { }
  //share variable for hide or show header
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //Login
  Login(Login:Login) {
    return this.http.post(this.GlobalUrl + this.LoginUrl , Login);
  }
}