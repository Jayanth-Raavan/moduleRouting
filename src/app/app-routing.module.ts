import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { GuardGuard } from './Auth/guard.guard';
import { RoleGuard } from './Auth/role.guard';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ChildGuard } from './Auth/child.guard';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:"",component:HomeComponent, canActivate:[GuardGuard]},
  {path:"employee", component:EmployeeComponent,canActivate:[GuardGuard]},
  {path:"user", component: UserComponent, canActivate:[RoleGuard],
          children:[{path:'view',component: ViewuserComponent},
                    {path:'add',component:AdduserComponent, canDeactivate: [ChildGuard]}]},
  {path:"contact",component:ContactComponent, canActivate:[RoleGuard]},
  {path:"login",component:LoginComponent},
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
