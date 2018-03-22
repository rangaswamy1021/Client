import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoginRequest } from '../modal/loginrequest';
import 'rxjs/add/operator/catch';

@Injectable()
export class BlockchainService {

  apiURL = "http://13.92.92.201:8080";
  constructor(private http: Http) {

  }

  getLogin(objLogin: LoginRequest): Observable<any> {
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
  getBlockchainStats(): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiURL + '/assurance/v1/stats', options).map(response => response.json());
  }

  getTransactions(): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiURL + '/assurance/v1/transactions', options).map(response => response.json());
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

  getResource(): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/client', options).map(response =>  response.json())

  }

  decomposedView( resourceId: number): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/decomposed/' + resourceId , options).map(response => response.json())
  }

  
  ownershipTrail( resourceId: number): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/ownership/' + resourceId , options).map(response => response.json())
  }

  stateTrail( resourceId: number): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/state/' + resourceId , options).map(response => response.json())
  }

  
  displayResNames(resourceIds): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.post(this.apiURL + '/assurance/v1/resource/name', resourceIds, options).map(response => response.json())
  }




}
