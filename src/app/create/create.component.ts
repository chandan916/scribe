import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorconfig:any;
 
  title:string="";
  content:string="";

  @Output('postcreated') postcreated=new EventEmitter();


  constructor() { 

    this.editorconfig = {
      enableToolbar:true,
      showToolbar:false
  }
}

  ngOnInit(): void {
  }

  createPost(){

    firebase.firestore().settings({
      timestampsInSnapshots:true
    });

    firebase.firestore().collection("posts").add({
      title:this.title,
      content:this.content,
      owner:firebase.auth().currentUser.uid,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
      this.postcreated.emit();
      console.log("1");
    }).catch((error)=>{
      console.log(error);
    })
  }

}
