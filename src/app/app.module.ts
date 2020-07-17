import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { UserComponent } from './Components/user/user.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';


import { AuthService } from './Services/auth.service';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    UserComponent,
    AllUsersComponent,
    NavbarComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
