import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor( public loginService: LoginService ) { 
    this.loginService.hide();
  }

  ngOnInit() {
   this.loginService.navtophide();
    this.loginService.hide();
  }

}
