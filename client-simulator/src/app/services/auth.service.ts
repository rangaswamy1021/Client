import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoginRequest } from '../modal/loginrequest';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  apiURL = "http://13.92.92.201:8080";
  constructor(private http: Http) {

  }

  login(objLogin: LoginRequest): Observable<any> { 
    return this.http.post(this.apiURL + '/assurance/v1/login', objLogin)
      .map(response => {
        let result = response.json();
        if (result && result.jwt) {
          localStorage.setItem('token', result.jwt);
          localStorage.setItem('token', result.jwt);
          localStorage.setItem('first', result.first);
          localStorage.setItem('last', result.last);
          localStorage.setItem('tenant', result.tenant);
          localStorage.setItem('username', result.username);
          return true;
        }
        else return false;
      })
      .catch((error: Response | any) => {
        console.error(error.message || error);
        return Observable.throw(error.status);
      });

  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('first');
    localStorage.removeItem('last');
    localStorage.removeItem('tenant');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    } else {
      return true;
    }


  }

}
