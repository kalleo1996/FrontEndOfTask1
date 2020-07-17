import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {usersmodel} from '../../Services/usersmodel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as M from '../../../assets/materialize-v1.0.0/materialize/js/materialize.min.js'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private auth:AuthService,private httpClient: HttpClient,private router: Router) { }

  ngOnInit(): void {
    
  }
  updateSelected=false;
  @Input() user:usersmodel;
  nic:String;
  mid:any;

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  onNicSubmit(){
    console.log("in the submit function" + this.nic)

    this.auth.getUserbyNIC(this.nic).subscribe(
      data => {
        console.log(data);
        this.user=data;
        this.mid=this.user.mid;

        if(this.mid==0)
        {
          return;
        }

        else
        
        {

          this.auth.getimgById(this.mid).subscribe(
            data =>{
             this.receivedImageData = data;
             this.base64Data = this.receivedImageData.pic;
             this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
            },
            err => console.log('Error Occured while retrieveing data: ' + err)
          )

        }

        
     

      },
      error => {
        console.log(error);
       
      }

    )
    }



    onDelete(id:number){
         
       this.auth.deleteEmployee(id).subscribe(
         data=>{
          
          
           
         },
         err=>{
           console.log(err)
         }
       )
       M.toast({html:"sucessfully deleted"})
       window.location.reload();

    }
    



    onUpdate(id:number){
      
     this.router.navigate(['update',id])

      
    


     
    }



}
