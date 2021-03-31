import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ViewComponent } from './view/view.component';
import {AuthGuard} from './auth.guard';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'myblogs',component:MyblogsComponent,canActivate:[AuthGuard]},
  {path:'edit-profile/:id',component:EditprofileComponent},
  {path:'view/:postId',component:ViewComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
