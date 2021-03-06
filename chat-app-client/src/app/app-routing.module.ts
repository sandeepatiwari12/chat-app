import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/shared/auth.gaurd.service';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: '../app/components/login/login.module#LoginModule'
  },
  {
    path: 'signup',
    loadChildren: '../app/components/signup/signup.module#SignUpModule'
  },
  {
    path: 'chats',
    canActivate: [AuthGuard],
    loadChildren: '../app/components/home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
