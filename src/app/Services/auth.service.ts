import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {usersmodel} from './usersmodel'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8080/profile/addUser';
  private getallUrl='http://localhost:8080/profile/users';
  private updateUrl='http://localhost:8080/profile/updateuser'
  
  user:any;



  constructor(private http: HttpClient) { }


  registeruser(user):Observable<any> {
    
    return this.http.post<string>(this.registerUrl, user, httpOptions);

  }
  
  updateuser(user):Observable<any> {
    
    return this.http.put<any>(this.updateUrl, user, httpOptions);

  }



  

  
  getAllUsers():Observable<usersmodel[]> {
    return this.http.get<usersmodel[]>(this.getallUrl);
  }

  getUserbyNIC(nic: String): Observable<usersmodel> {
    return this.http.get<usersmodel>('http://localhost:8080/profile/user/'+nic);
  
  }

//getting user by Id
  getUserById(id:number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/profile/userbyid/'+id);
  
  }

//getting img by Id
  getimgById(id:Number): Observable<any> {
    
    return this.http.get<any>('http://localhost:8080/check/userimgbyid/'+id);
  
  }


 
//delete user by Id
  deleteEmployee(id: number): Observable<String> {

    return this.http.delete<String>('http://localhost:8080/profile/delete/'+id);
    
  }




}
  
 

 

  


