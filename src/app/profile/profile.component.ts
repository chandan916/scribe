import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any={};
  posts:any[]=[];

  constructor(public activatedroute:ActivatedRoute) {
    let id=this.activatedroute.snapshot.paramMap.get('id');
    this.getProfile(id);
    this.getuserpost(id);
   }

  ngOnInit(): void {
  }

  getProfile(id:string){
   
    firebase.firestore().collection("users").doc(id).get().then((data)=>{
      this.user=data.data();
      this.user.displayname=this.user.firstname+' '+this.user.lastname;
      this.user.id=data.id;
      this.user.hobbies=this.user.hobbies.split(",");
    }).catch((error)=>{console.log(error);})

  }

  getuserpost(id:string){
    firebase.firestore().collection("posts")
    .where("owner","==",id).get().then((data)=>{
      this.posts=data.docs;
    })
  }

}
