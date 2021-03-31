import { Component, OnInit,Input } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {


  comments:any[]=[];
  comment:string="";
  loggedIn:boolean=false;

  @Input("postId") postId:string; 
  constructor() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){this.loggedIn=true;}
      else{this.loggedIn=false;}
    })
   }

  ngOnInit(): void {
    this.getcomments();
  
  }

  postcomment(){
    if(this.comment.length<5){
      return ;
    }
    firebase.firestore().collection("comments").add({
      text:this.comment,
      post:this.postId,
      owner:firebase.auth().currentUser.uid,
      ownername:firebase.auth().currentUser.displayName,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then((data)=>{
      console.log("comment is saved")
      this.getcomments();
    }).catch((error)=>{
      console.log(error); 
    })
  }

  getcomments(){

    this.comments=[];

    firebase.firestore().collection("comments")
    .where("post","==",this.postId)
    .orderBy("created","desc")
    .get().then((data)=>{

      data.docs.forEach((commentref)=>{
        this.comments.push(commentref.data())
      })
    })

  }

}
