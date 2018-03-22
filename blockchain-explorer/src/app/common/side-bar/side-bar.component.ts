import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/login.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(public loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.show();
  }

  menuToggle(event:any){
    if ($("body").hasClass("mini-sidebar")) {
      $("body").trigger("resize");
      $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
      $("body").removeClass("mini-sidebar");
      $('.navbar-brand span').show();
      $(".sidebartoggler i.mdi-chevron-left").show();
      $(".sidebartoggler i.mdi-chevron-right").hide();
      // $(".sidebartoggler i").removeClass("mdi mdi-chevron-right");
    }
    else {
      $("body").trigger("resize");
      $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
      $("body").addClass("mini-sidebar");
      $('.navbar-brand span').hide();
      $(".sidebartoggler i.mdi-chevron-left").hide();
      $(".sidebartoggler i.mdi-chevron-right").show();
      // $(".sidebartoggler i").addClass("mdi mdi-chevron-right mdi");
      // $(".sidebartoggler i").removeClass("mdi mdi-chevron-left mdi");
    }
  
  }

}
