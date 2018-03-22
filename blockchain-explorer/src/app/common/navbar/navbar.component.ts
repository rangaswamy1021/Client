import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BlockchainService } from '../../services/blockchain.service';
import { LoginRequest } from '../../modal/loginrequest';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginRequest = <LoginRequest>{};
  userData: any;
  constructor(public loginService: LoginService,
    private blockchainService: BlockchainService,
    private router: Router) {

  }

  ngOnInit() {

  }

  get First(): any {
    return localStorage.getItem('first');
  }
  get Last(): any {
    return localStorage.getItem('last');
  }
  get Account(): any {
    return localStorage.getItem('tenant');
  }



  isLogout() {
    this.blockchainService.logout();
    this.router.navigateByUrl('/login')
  }



}
