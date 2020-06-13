import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersListComponent } from '../../Module/Users/users-list/users-list.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../Services/login/loginservice.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild("UsersListComponent") UsersListComponent: UsersListComponent;
  GuaranterName: string;
  counter;
  Language = localStorage.getItem('Language');

  constructor(private LogOutRout: Router,private translate: TranslateService, private LoginService: LoginService) {
    this.Language = this.Language;
    this.ChangeLanguage();
   }

  ngOnInit(): void {
  }

  ShowAddModal() {
    this.UsersListComponent.ShowAddModal();
  }
//for log out 
  LogOut(){
    localStorage.clear();
    this.LoginService.isUserLoggedIn.next(false);
    this.LogOutRout.navigate(['/sign-in']);
  }
//for change laguage
  ChangeLanguage() {
    if (this.Language == 'ENG') {
      this.Language = 'AR'
      this.translate.use('En');
    }
    else {
      this.Language = 'ENG'
      this.translate.use('ar');
    }
    localStorage.setItem('Language',this.Language);
  }
}