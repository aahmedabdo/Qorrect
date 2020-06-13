import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserserviceService } from '../../../Services/Users/userservice.service';
declare var $: any;
import Swal from 'sweetalert2'  //npm install --save sweetalert2
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.css']
})
export class UsersAddEditComponent implements OnInit {
  @Input() counterUser: string;
  @Output() counterChange = new EventEmitter<any>();
  form: FormGroup;
  submitted = false;
  login: any = {};
  token: string;
  Logo: string;
  Language = localStorage.getItem('Language');
  User: any = {};
  public imagePath;
  imgURL: any;
  public message: string;
  ShowBtn: boolean = false;

  constructor(private fb: FormBuilder, private UserserviceService: UserserviceService, private translate: TranslateService) {
    this.Language = this.Language;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl('', [Validators.required])
    })
  }
  get f() { return this.form.controls; }

  //for upload file and read image
  handleUpload(e): void {
    var mimeType = e[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = e;
    reader.readAsDataURL(e[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  //close modale
  closeModal() {
    this.User = {};
    this.imgURL = null;
    $('#myModalAddEditComponent').modal('hide');
  }
  //get one User by id for show in modal
  GetOneUser(id: number) {
    this.UserserviceService.GetOneUser(id).subscribe((Response: any) => {
      this.User = Response.data;
      this.imgURL = this.User.avatar;
      if (this.User.id)
        this.ShowBtn = true;
    })
  }
  //for add New User
  onRegister() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.UserserviceService.CreateNewUser(this.User).subscribe((Response: any) => {
      Swal.fire(
        this.translate.instant('Add'),
        this.translate.instant('AddSuccess'),
        'success'
      )
      this.User = {};
      this.imgURL = null;
    }, error => {
      if (error.status == 400) {
        alert(error.error.error);
      }
      else if (error.status == 0)
        alert('please check your internet connection')
    })
  }
  CancelUpdateUser() {
    this.User = {};
    $('#myModalAddEditComponent').modal('hide');
  }
  //update user
  UpdateUser() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.UserserviceService.UpdateUser(this.User).subscribe((Response: any) => {
      this.User = Response;
      Swal.fire(
        this.translate.instant('Edit'),
        this.translate.instant('UpdateSuccess'),
        'success'
      )
      this.counterChange.emit(this.User);
      this.User = {};
      this.imgURL = null;
    }, error => {
      if (error.status == 400) {
        alert(error.error.error);
      }
      else if (error.status == 0)
        alert('please check your internet connection')
    })
  }
}