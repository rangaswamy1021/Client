import { BlockchainService } from './../services/blockchain.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from '../modal/loginrequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  userData: any;
  loginForm: FormGroup;
  hideLanding: boolean;
  loginRequest: LoginRequest = <LoginRequest>{};
  constructor(public loginService: LoginService, private router: Router, private blockchainService: BlockchainService) { }

  ngOnInit() {
    this.loginService.hide();
    this.loginService.navtop();
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'tenant': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })

  }
  loginBtn() {   
    this.loginRequest = <LoginRequest>{};
    this.loginRequest.username = this.loginForm.controls['username'].value;
    this.loginRequest.password = this.loginForm.controls['password'].value;
    this.loginRequest.tenant = this.loginForm.controls['tenant'].value;
    this.blockchainService.getLogin(this.loginRequest).subscribe(res => {
      if (res) {
        this.userData = res;
        this.router.navigate(['/']);
      }
      else {
        this.invalidLogin = true;
      }
    },
      errorCode => this.userData = errorCode
    )
  }




}
