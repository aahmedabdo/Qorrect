import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAddEditComponent } from '../users-add-edit/users-add-edit.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { SharedmoduleModule } from '../../../sharedmodule/sharedmodule.module';
import { UsersroutingModule } from './Users-routing.module';

@NgModule({
  declarations: [UsersAddEditComponent, UsersListComponent],
  imports: [
    CommonModule,
    SharedmoduleModule,
    UsersroutingModule
  ]
})
export class UsersModule { }