import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../../Services/login/loginservice.service';
import { Login } from '../../Interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  login: any = {};
  Language = 'AR';
  token: string;

  constructor(private LoginRout: Router, private fb: FormBuilder, private translate: TranslateService, private LoginService: LoginService) {
    this.translate.use('En');
    this.Language = this.Language;
    this.LoginService.isUserLoggedIn.next(false);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  get f() { return this.form.controls; }
  //for login user
  onLogin() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.LoginService.Login(this.login).subscribe((Response: any) => {
      this.token = Response.token;
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('Language', this.Language);
        this.LoginService.isUserLoggedIn.next(true);
        this.LoginRout.navigate(['/Users_List']);
      }
      else {
        alert('error username');
      }
    }
      , error => {
        if (error.status == 400) {
          alert(error.error.error);
        }
        else if (error.status == 0)
          alert('please check your internet connection')
      })
  }

  //for change language 
  ChangeLanguage() {
    if (this.Language == 'ENG') {
      this.Language = 'AR'
      this.translate.use('En');
    }
    else {
      this.Language = 'ENG'
      this.translate.use('ar');
    }
    localStorage.setItem('Language', this.Language);
  }
}