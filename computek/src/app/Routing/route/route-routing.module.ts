import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../Module/login/login.component';

const routes: Routes = [
  //*********************** */login Module/*************************/
  { path: '', component: LoginComponent },
  { path: 'sign-in', component: LoginComponent },
  //*********************** */Users   Module/*************************/
 { path: '', loadChildren: () => import('../../Module/Users/Users_Module_Route/Users.module').then(m => m.UsersModule) },

  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RouteRoutingModule { }