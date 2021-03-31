import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormBuilder,FormControl,Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:any;
  myform:FormGroup;
  message:string="";
  usererror:any;

  constructor(public fb:FormBuilder,public authservice:AuthService) { 
    this.myform=this.fb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]]
    },{
      validator:this.checkifpasswordmatching("password","confirmpassword")
    })
   }

   checkifpasswordmatching(passwordkey:string,confirmpasswordkey:string){
     return (group:FormGroup)=>{
       let password=group.controls[passwordkey];
       let confirmpassword=group.controls[confirmpasswordkey];
       if(password.value==confirmpassword.value){
         return;
       }else{
         confirmpassword.setErrors({
           notequaltopassword:true
         })
       }
     }
   }


  onreactsubmit(alos){
      let email:string=alos.value.email;
      let password:string=alos.value.password;
      let firstname:string=alos.value.firstname;
      let lastname:string=alos.value.lastname;

      this.authservice.signup(email,password,firstname,lastname).then(
        (user:any)=>{
          firebase.firestore().collection("users").doc(user.uid).set({
            firstname:alos.value.firstname,
            lastname:alos.value.lastname,
            email:alos.value.email,
            photourl:user.photoURL,
            interest:"",
            bio:"",
            hobbies:""
          }).then(()=>{
            this.message="You have signed up successfully !!"
          })
       }).catch((error)=>{
         this.usererror=error;
      })
  }

  ngOnInit(): void {
  }

}
