import { Injectable } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Injectable()
export class LoginService {

  topelement: boolean;
  visible: boolean;
  nopadding: boolean;

  constructor() { }
  
  hide() {
    this.visible = true;
  }
  show() {
    this.visible = false;
  }
  navtop() {
    this.topelement = false ;
  }
  navtophide() {
    this.topelement = true ;
  }

}
