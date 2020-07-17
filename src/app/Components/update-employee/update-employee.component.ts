import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as M from 'myappfront/src/assets';
import {AuthService} from '../../Services/auth.service';
import * as M from '../../../assets/materialize-v1.0.0/materialize/js/materialize.min.js'
import {usersmodel} from '../../Services/usersmodel';


import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  user: usersmodel; 
  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  imgselected=false;

  constructor(private router:Router,private route:ActivatedRoute,private auth:AuthService,private httpClient: HttpClient ) { }

  ngOnInit(): void {
   
   this.user=new usersmodel();
   this.id = this.route.snapshot.params['id'];
   
   this.auth.getUserById(this.id)
   .subscribe(data => {
     console.log(data)
     this.user = data;
      if(this.user.mid==0)
      {
        return;
      }

      this.auth.getimgById(this.user.mid).subscribe(
        data =>{
          this.receivedImageData = data;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
         },
         err => console.log('Error Occured while retrieveing data: ' + err)
      )
   }, error => console.log(error));

   

  }





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








  updateEmployee() {
      
    if(this.imgselected==true)
    {
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    
  
  
      this.httpClient.post('http://localhost:8080/check/upload', uploadData)
      .subscribe(
                    res => {console.log(res);
                           this.receivedImageData = res;
                           this.base64Data = this.receivedImageData.pic;
                           this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
                           this.user.mid=this.receivedImageData.id;
                           console.log(this.user)
                           this.auth.updateuser(this.user)
                           .subscribe(data => {console.log(data)
                               M.toast({html:"user sucessfully updated"})
                               
                             
                              this.router.navigate(['allusers'])

                          
                          }
                           , error => console.log(error));
  
                    },
                    
                    err=>console.log(err)
  
  
  
     
      )
  
    
    }else{

      this.auth.updateuser(this.user)
      .subscribe(data => {console.log(data)
        M.toast({html:"User sucessfully updated"})
       
        this.router.navigate(['allusers'])
      
      }
      , error => console.log(error));


    }
   


}
}
