import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserserviceService } from '../../../Services/Users/userservice.service';
import { User } from '../../../Interfaces/User';
import { UsersAddEditComponent } from '../users-add-edit/users-add-edit.component';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
  @ViewChild("UsersAddEditComponent") UsersAddEditComponent: UsersAddEditComponent;
  Users: User[];
  User: User;
  ifShow: boolean = false;
  totalPage: number = 0;
  currentPage: number = 1;
  PagesList: any = [];
  @Input() counter: string;
  @Output() counterChange = new EventEmitter<any>();
  OldUser: any;
  constructor(private LoginRout: Router, private fb: FormBuilder, private translate: TranslateService,
    private UserserviceService: UserserviceService) {
    this.GetUserPage(1);
  }
  ngOnInit(): void {
  }

  //get one Users By page
  GetUserPage(PageNumber: number) {
    this.UserserviceService.GetUserPage(PageNumber).subscribe((Response: any) => {
      this.Users = Response.data;
      this.totalPage = Response.total_pages;
      this.PagesList = [];
      this.currentPage = PageNumber;
      for (let index = 0; index < this.totalPage; index++) {
        this.PagesList.push(index);
      }
    })
  }

  //get one User by id for show in side bar
  GetOneUser(id: number) {
    this.UserserviceService.GetOneUser(id).subscribe((Response: any) => {
      this.User = Response.data;
      if (this.User.id)
        this.ifShow = true;
    })
  }

  EditUser(id: any) {
    this.UsersAddEditComponent.GetOneUser(id);
    $('#myModalAddEditComponent').modal({
      keyboard: false
    });
  }

  //close side bar
  closeSide() {
    this.ifShow = false;
  }
  //show Modal For Add New User
  ShowAddModal() {
    $('#myModalAddEditComponent').modal({
      keyboard: false
    });
  }
//passing data between 2 component Add component and list user
  onNewChange(UpdatedUser: User) {
    UpdatedUser.updatedAt = formatDate(UpdatedUser.updatedAt, 'yyyy-MM-dd hh:mm', 'en');
    this.User = UpdatedUser;
    $('#myModalAddEditComponent').modal('hide');
  }
//for delete user
  DeleteUser(id: number) {
    Swal.fire({
      title: this.translate.instant('DeleteTitle'),
      html: this.translate.instant('DeleteText'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا"
    }).then((result) => {
      if (result.value) {
        this.UserserviceService.DeleteUser(id).subscribe((Respons: any) => {
          Swal.fire(
            this.translate.instant('Delete'),
            this.translate.instant('DeleteSuccess'),
            'success'
          )
        })
      }
    })
  }
  
  //pagination
  FirstPage() {
    this.GetUserPage(1);
  }
  LastPage() {
    this.GetUserPage(this.totalPage);
  }
  CurrentPage(id: number) {
    this.GetUserPage(id);
  }
}
