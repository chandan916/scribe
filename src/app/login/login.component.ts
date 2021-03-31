import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormBuilder,FormControl,Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform:FormGroup;
  message:string="";
  usererror:any;

  constructor(public fb:FormBuilder,public authservice:AuthService) {
    this.myform=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    })
   }

   onreactsubmit(form){
     this.authservice.login(form.value.email,form.value.password).then((data)=>
      {
     
        this.message="successfully logged in!!"
      }
     ).catch((err)=>{
       this.usererror=err;
     })
   }

  ngOnInit(): void {
  }

}
