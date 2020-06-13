 import { NgModule } from '@angular/core';
 import { RouterModule, Routes } from '@angular/router';
import { UsersAddEditComponent } from '../users-add-edit/users-add-edit.component';
import { UsersListComponent } from '../users-list/users-list.component';

// //*********************** */Web App Module/*************************/
const routes: Routes = [
      { path: 'NewUser/:UserId', component: UsersAddEditComponent },
      { path: 'Users_List', component: UsersListComponent },
  ];
  
   @NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
  })
  
   export class UsersroutingModule { }
  