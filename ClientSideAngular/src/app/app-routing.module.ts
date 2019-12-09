import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing all the components
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {UserTimesComponent} from './components/user-times/user-times.component'
import {AdminTimesComponent} from './components/admin-times/admin-times.component'

//declaring the paths
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'signup' , component: SignupComponent},
  {path: 'userTimes' , component: UserTimesComponent},
  {path: 'adminTimes' , component: AdminTimesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
