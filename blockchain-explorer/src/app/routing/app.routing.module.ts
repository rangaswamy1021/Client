import { ResourceExplorerComponent } from './../resource-explorer/resource-explorer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../auth.guard';
 
const appRoutes:Routes = [
  { path:'', component:ResourceExplorerComponent, canActivate: [AuthGuard]},
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