import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as M from 'myappfront/src/assets';
import {AuthService} from '../../Services/auth.service';
import * as M from '../../../assets/materialize-v1.0.0/materialize/js/materialize.min.js'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  fname:String;
  lname:String;
  email:String;
  nic:String;
  date:any;
  address:String;
  telephone:String;
  imgselected=false;
  
  constructor(private httpClient: HttpClient, private auth:AuthService) { }

  ngOnInit(): void {
    
  

 
  
  
  }

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  mid:any;


  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.imgselected=true;
    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };
  

 

 }


 // This part is for uploading
 onUpload() {

  
  
           
          }



  onRegisterSubmit(){
   
    
      
     
      
       
 if(this.imgselected==false){
    
  const user={
    fname:this.fname,
    lname:this.lname,
    nic:this.nic,
    email:this.email,
    dob:this.date,
    address:this.address,
    phone_number:this.telephone,
    mid:0


  }
   this.auth.registeruser(user).subscribe(
    res => {
      console.log(res);
      M.toast({html: 'Sucessfully Registered'})
    },
    err => {
      console.log(err);
     
    }


  )





 }else{

       const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


  this.httpClient.post('http://localhost:8080/check/upload', uploadData)
  .subscribe(
                res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                       
                       localStorage.setItem("mid",this.receivedImageData.id)
                       console.log(this.mid)
                       

                       const user={
                        fname:this.fname,
                        lname:this.lname,
                        nic:this.nic,
                        email:this.email,
                        dob:this.date,
                        address:this.address,
                        phone_number:this.telephone,
                        mid:localStorage.getItem("mid")
               
               
                      }
                       this.auth.registeruser(user).subscribe(
                        res => {
                          console.log(res);
                          M.toast({html: 'Sucessfully Registered'})
                          
                        },
                        err => {
                          console.log(err);
                          window.location.reload();
                        }
                
                
                      )
                      },
               err => console.log('Error Occured duringng saving: ' + err)
            );


            window.location.reload();

                    }
       



    }



  
    








 }














