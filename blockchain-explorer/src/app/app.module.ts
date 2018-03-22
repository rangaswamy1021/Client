import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';

import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { BlockChainComponent } from './common/block-chain/block-chain.component';
import { MenuBarComponent } from './common/menu-bar/menu-bar.component';
import { ResourceExplorerComponent } from './resource-explorer/resource-explorer.component';
import { RoutingModule } from './routing/app.routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { SideBarComponent } from './common/side-bar/side-bar.component';
import { BlockchainService } from './services/blockchain.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    NavbarComponent,
    BlockChainComponent,
    MenuBarComponent,
    ResourceExplorerComponent,
    LoginComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NvD3Module,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule
  ],
  providers: [LoginService, BlockchainService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
