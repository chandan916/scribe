import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user:any={}

  posts:any[]=[];

  constructor() {   
    this.user=firebase.auth().currentUser;
    this.getpost();
  }

  ngOnInit(): void {
  }


  getpost(){

    firebase.firestore().collection("posts").orderBy("created","desc").get().then((data)=>{
        this.posts=data.docs;
    }).catch((err)=>{console.log(err)})
  }

  onpostcreated(){
    console.log("2");
    this.posts=[];
    this.getpost();
  }

  ondelete(){
    this.posts=[];
    this.getpost();
  }

}
