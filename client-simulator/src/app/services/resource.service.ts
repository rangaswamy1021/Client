import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { ResourceRequest } from '../modal/resourcerequest';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ListRequest } from '../modal/listrequest';

@Injectable()
export class ResourceService {
  resources: ResourceRequest[];
  apiURL = "http://13.92.92.201:8080";

  constructor(private http: Http) { }

  getResId(id: number) {
    const singleResource = this.resources.find(
      (e) => {
        return e.resourceId == id;
      }
    );
    return singleResource;
  }


  getResource(): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/client', options).map(response => {
      return this.resources = response.json()
    })

  }

  createResource(objResource: ResourceRequest): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.post(this.apiURL + '/assurance/v1/resource', objResource, options).map(response => response.json())
  }

  modifyResource(objResource: ResourceRequest): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.post(this.apiURL + '/assurance/v1/resource/update', objResource, options).map(response => response.json())
  }

  listResource(objList: ListRequest): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.post(this.apiURL + '/assurance/v1/resource/update', objList, options)
      .map(response => response.json())
      .catch((error: Response | any) => {
        console.error(error.message || error);
        return Observable.throw(error.status);
      });
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

  requestToBuy(buyresId): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.post(this.apiURL + '/assurance/v1/resource/buy', buyresId, options).map(response => response.json())
  }

  viewPurchase(): Observable<any> {
    let getToken = localStorage.getItem('token');
    let myHeaders = new Headers();
    myHeaders.append('jwt', getToken);
    let options = new RequestOptions({ headers: myHeaders })
    return this.http.get(this.apiURL + '/assurance/v1/resource/buy', options).map(response => response.json())
  }


}
