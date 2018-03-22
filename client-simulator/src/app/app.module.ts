import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';


import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { MenuBarComponent } from './common/menu-bar/menu-bar.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing/app.routing.module';
import { LoginService } from './services/login.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { ResourceService } from './services/resource.service';




@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    NavbarComponent,
    MenuBarComponent,
    CreateResourceComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NvD3Module
  ],
  providers: [LoginService, AuthService,  AuthGuard, ResourceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
