import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {DriversComponent} from './drivers/drivers.component';
import {DustbinComponent} from './dustbin/dustbin.component';
import {NotificationComponent} from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
      path:'drivers',
      component:DriversComponent
  },
  {
      path:'dustbin',
      component:DustbinComponent
  },
  {
      path:'notification',
      component:NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
