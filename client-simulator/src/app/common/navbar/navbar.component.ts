import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../modal/loginrequest';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
    private authService: AuthService,
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
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
  loggedIn() {
    return this.authService.isLoggedIn();
  }
  

}
