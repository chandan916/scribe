import * as firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CreateComponent } from './create/create.component';
import { NgxTextEditorModule } from 'ngx-text-editor';
import {HttpClientModule} from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';

var config = {
  apiKey: "AIzaSyDuBPOea3jYf2XNKOh0bGc2vFyVFsXZy5A",
  authDomain: "scribe-4584a.firebaseapp.com",
  databaseURL: "https://scribe-4584a.firebaseio.com",
  projectId: "scribe-4584a",
  storageBucket: "scribe-4584a.appspot.com",
  messagingSenderId: "875210761375",
  appId: "1:875210761375:web:3aa983c76436c5f4d5aeaa",
  measurementId: "G-FZ2VB32VKZ"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MyblogsComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditprofileComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTextEditorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
