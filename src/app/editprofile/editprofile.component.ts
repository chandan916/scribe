import { Component, OnInit } from '@angular/core';
import * as firebases from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user:any={};
  message:string="";
  imgSrc: string;
  selectedImage: any = null;
  newurl:string;

  constructor() {
    this.getProfile();
   }

  ngOnInit(): void {
  }

  getProfile(){
    let userId=firebases.auth().currentUser.uid;

    firebases.firestore().collection("users").doc(userId).get().then((data)=>{
      this.user=data.data();
      this.user.displayname=this.user.firstname+' '+this.user.lastname;
      this.user.id=data.id;
      console.log(this.user);
    }).catch((error)=>{console.log(error);})

  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
     var file=event.target.files[0];
      var bucketName = 'onlineclassbucket';
  var bucketRegion = 'ap-south-1';
  var IdentityPoolId = 'ap-south-1:c46dd70c-a272-439e-9bc6-0c2e3cb35e4e';
   AWS.config.update({
                  region: bucketRegion,
                  credentials: new AWS.CognitoIdentityCredentials({
                      IdentityPoolId: IdentityPoolId
                  })
              });
  
              var s3 = new AWS.S3({
                  apiVersion: '2006-03-01',
                  params: {Bucket: bucketName}
          });
        var fileName = file.name;
        var filePath = 'onlineclassbucket/' + fileName;
        var fileUrl = `https://${bucketRegion}.amazonaws.com/${filePath}`;
        s3.upload({
          Bucket:'onlineclassbucket',
           Key: filePath,
           Body: file,
           ACL: 'public-read'
           }, function(err, data) {
           if(err) {
           console.log(err.message);
           }
           if(data){
             this.newurl=data.Location;
             console.log("new link for file",this.newurl);
             firebases.auth().currentUser.updateProfile({
                    photoURL:this.newurl
             }).then(()=>{
              let userId=firebases.auth().currentUser.uid;
              firebases.firestore().collection("users").doc(userId).update({
              photourl:this.newurl  
              }).then(()=>{this.message="Profile photo changed"}).catch((err)=>{console.log(err);});
              });
           }
           });
      
    }
    else {
      this.imgSrc = this.user.photourl;
      this.selectedImage = null;
    }
  }
 
  update(){
    console.log("updation",this.newurl);
    firebases.auth().currentUser.updateProfile({
      displayName:this.user.displayname
    }).then(()=>{
      let userId=firebases.auth().currentUser.uid;
      firebases.firestore().collection("users").doc(userId).update({
        firstname:this.user.displayname.split(' ')[0],
        lastname:this.user.displayname.split(' ')[1],
        hobbies:this.user.hobbies,
        interest:this.user.interest,
        bio:this.user.bio
      }).then(()=>{
        this.message="Profile update successfully";
      }).catch((err)=>{
        console.log(err);
      })
    });
  }

}
