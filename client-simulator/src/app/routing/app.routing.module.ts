import { CreateResourceComponent } from './../create-resource/create-resource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth.guard';
 
const appRoutes:Routes = [
  { path:'', component:CreateResourceComponent, canActivate: [AuthGuard]},
  { path:'login', component:LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})

export class RoutingModule{
   
}