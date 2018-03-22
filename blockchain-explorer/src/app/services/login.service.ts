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

  menuChange(){
    $(".sidebartoggler").on('click', function () {
      alert('ok')
      if ($("body").hasClass("mini-sidebar")) {
        $("body").trigger("resize");
        $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();
        //$(".sidebartoggler i").addClass("ti-menu");
      }
      else {
        $("body").trigger("resize");
        $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();
        //$(".sidebartoggler i").removeClass("ti-menu");
      }
    });
  }

}
