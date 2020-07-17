import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { UserComponent } from './Components/user/user.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';

const routes: Routes = [
  { path: 'newuser',component: NewUserComponent },
  { path: 'userprofile',component: UserComponent },
  { path: 'allusers',component: AllUsersComponent  },
  {path:'update/:id',component:UpdateEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
