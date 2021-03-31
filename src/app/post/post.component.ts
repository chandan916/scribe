import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post:any;

  @Output('ondelete') ondelete =new EventEmitter();

  postdata:any={};

  userdata:any={};

  constructor() { }

  ngOnInit(): void {
    this.postdata=this.post.data();
    this.userdata=firebase.auth().currentUser;
  }

  delete(){
    firebase.firestore().collection("posts").doc(this.post.id).delete().then(()=>{
        this.ondelete.emit();
    });
  }

}
