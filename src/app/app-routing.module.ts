import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {TourComponent} from './visualization/tour/tour.component';
import {DashboardComponent} from './dashboard/dashboard.component';

// TODO Page guard
const appRoutes: Routes = [
  {path: '', redirectTo: '/tour', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'tour', component: TourComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: '/tour'},
];

@NgModule({
  imports: [
    [RouterModule.forRoot(appRoutes)]
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
