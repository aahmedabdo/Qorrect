import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Global } from '../../Global/GlobalUrl'
import { Observable } from 'rxjs';
import { User } from '../../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  GlobalUrl = Global.urls.GlobalUrl;

  //Api Url
  GetUserPageUrl = 'api/users?page=';
  GetOneUserUrl = 'api/users/';
  CreateNewUserUrl = 'api/users'

  constructor(private http: HttpClient) { }

  token(): string {
    if (localStorage.getItem('token') == null || localStorage.getItem('token') === undefined) {
      return '';
    } else {
      return localStorage.getItem('token');
    }
  }

  //Get Users By Page
  GetUserPage(pagenumber: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token() });
    return this.http.get<User>(this.GlobalUrl + this.GetUserPageUrl + pagenumber, { headers });
  }
  //Get one USer For Show in Side Bar
  GetOneUser(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token() });
    return this.http.get<User>(this.GlobalUrl + this.GetOneUserUrl + id);
  }

  //Add New User Fuction
  CreateNewUser(user: User) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token() });
    return this.http.post(this.GlobalUrl + this.CreateNewUserUrl, user);
  }
//update One User
  UpdateUser(user: User) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token() });
    return this.http.put(this.GlobalUrl + this.GetOneUserUrl + user.id, user);
  }
  //Delete One User
  DeleteUser(id: number) {
    const  headers = new HttpHeaders({ Authorization: 'Bearer ' + this.token() });
    return this.http.delete(this.GlobalUrl + this.GetOneUserUrl + id);
  }
}