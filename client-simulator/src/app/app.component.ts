import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor( public loginService: LoginService, private authService: AuthService ) { 
    this.loginService.hide();
  }

  ngOnInit() {
   this.loginService.navtophide();
    this.loginService.hide();
  }
  loggedIn() {
    return this.authService.isLoggedIn();
  }



}
