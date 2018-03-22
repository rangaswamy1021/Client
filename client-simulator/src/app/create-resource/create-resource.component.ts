import { element } from 'protractor';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResourceRequest } from '../modal/resourcerequest';
import { ResourceService } from '../services/resource.service';
import { ResourceResponse } from '../modal/resourceresponse';
import { ListRequest } from '../modal/listrequest';

declare var $: any;
declare let d3: any;
declare let svg: any;

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss']
})
export class CreateResourceComponent implements OnInit {
  requestView: boolean;
  resquestIdData: any;
  resquestId: any;
  buyerResource: string;
  purchaseLists: any;
  tableHide: boolean;
  graphVisualHide: boolean;
  elementskillArray: any[];
  elementskill: any;
  indexvalue: number;
  totalsource: any[];
  newnames: any[];
  teststr: string;
  links: any[] = [];
  resType: any;
  nodes: any[] = [];
  options: any;
  data;
  resourcename: any;
  resourceIds: number[];
  disabledView: boolean;
  arrayInputElement: boolean;
  stateTraildata: any;
  stateTrailData: any;
  ownershipdata: any;
  ownerTrailData: any;
  hideSetEle: boolean;
  viewLists: ResourceResponse[];
  decomViewData: any;
  searchData: any;
  sellitemId: any;
  type: string;
  items = [];
  value: boolean;
  buttonValue: string;
  disabledModify: boolean = false;
  selectedAll: any;
  datasets: any;
  skills: any;
  selecteresourceId: any;
  showResourceForm: boolean;
  // resources: any[] = <any>[];
  resources: ResourceRequest[];
  listData: ListRequest = <ListRequest>{};
  resourceForm: FormGroup;
  sellForm: FormGroup;
  isCustomerSelected: any;
  resourceRequest: ResourceRequest = <ResourceRequest>{};

  constructor(public loginService: LoginService,
    private resourceService: ResourceService, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.tableHide = true;
    this.disabledModify = false;
    this.items = [];
    this.getResourceData();
    this.loginService.navtophide();
    this.loginService.show();
    this.resourceForm = new FormGroup({
      'resourceName': new FormControl('', [Validators.required]),
      'resourceType': new FormControl('', [Validators.required]),
      'resourceId': new FormControl({ value: '', disabled: true }),
      'values': new FormArray([])
    });

    this.sellForm = new FormGroup({
      'ownername': new FormControl('', [Validators.required]),
    })
  }

  getResourceData() {
    this.resourceService.getResource().subscribe(res => {
      this.resources = res;
      if (res) {
        this.resources.forEach(element => {
          let resArray = element.skills.concat(element.datasets)
          this.resourceRequest.resourceIds = resArray;
          this.resourceService.displayResNames(this.resourceRequest).subscribe(res1 => {
            this.resourcename = res1;
            element.skills = element.skills.map(elem => elem.toString() + " - " + res1[elem]);
            element.datasets = element.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
          })
        });

      }
    })
  }


  addResource() {  
    this.resourceRequest = <ResourceRequest>{};
    this.resourceRequest.resourceName = this.resourceForm.controls['resourceName'].value;
    this.resourceRequest.resourceType = this.resourceForm.controls['resourceType'].value;
    if ((this.resourceForm.valid)) {
      this.resourceService.createResource(this.resourceRequest).subscribe(res => {
        if (res) {
          this.showResourceForm = false;
          this.getResourceData();
          this.toastr.success('Resource has been created successfully', 'Success!');
          this.resourceForm.reset();
          this.items = [];
        } else {
          this.toastr.error('Unable to create Resource', 'Oops!');
          this.items = [];
        }
      },
        errorCode => {
          this.toastr.error('Unable to create Resource', 'Oops!');
          this.resourceForm.reset();
        }
      );
    }
  }



  onAddValue() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.resourceForm.get('values')).push(control);
  }

  delInput(index: number): void {
    const control = new FormControl(null, Validators.required);
    const arrayControl = <FormArray>this.resourceForm.controls['values'];
    arrayControl.removeAt(index);
  }


  patchValueData(resourceData) {
    this.resourceForm.patchValue({
      'resourceType': resourceData.resourceType,
      'resourceId': resourceData.resourceId,
    });
  }

  updateDataResource() {
    this.resourceRequest = <ResourceRequest>{};
    this.resourceRequest.type = this.resourceForm.controls['resourceType'].value;
    this.resourceRequest.value = this.resourceForm.controls['values'].value;
    this.resourceRequest.resourceId = this.selecteresourceId.resourceId;
    this.resourceService.modifyResource(this.resourceRequest).subscribe(res => {
      if (res) {
        this.getResourceData();
        $("#responsive-modal").modal("hide");
        this.toastr.success('Resource has been updated successfully', 'Success!');
        this.resourceForm.reset();
      } else {
        this.toastr.error('Unable to update Resource', 'Oops!');
      }
    },
      errorCode => {
        this.toastr.error('Unable to update Resource', 'Oops!');
        this.resourceForm.reset();
      }
    );
  }

  sellChange() {
    for (var i = 0; i < this.items.length; i++) {
      this.sellitemId = this.items[i];
    }
  }



  sellDataUpdate() {
    this.listData.resourceId = this.sellitemId.resourceId;
    this.listData.type = 'ownership';
    this.listData.value = this.sellForm.controls['ownername'].value;
    this.resourceService.listResource(this.listData).subscribe(res => {
      this.getResourceData();
      if (res) {
        this.toastr.success('Resource Owner has been updated successfully', 'Success!');
        $(".resource-sell").modal("hide");
      } else {
        this.toastr.error('Unable to update Resource Owner', 'Oops!');
      }
    })
  }

  decomposedView() {
    for (var i = 0; i < this.items.length; i++) {
      this.decomViewData = this.items[i];
      this.displayView(this.decomViewData.resourceId)
    }
  }
  displayView(resId) {
    this.resourceService.decomposedView(resId).subscribe(res => {
      this.viewLists = res;
      this.dispalyCharts();
      this.jsonData();
      if (res) {
        this.viewLists.forEach(element => {
          let resArray = element.skills.concat(element.datasets)
          this.resourceRequest.resourceIds = resArray;
          this.resourceService.displayResNames(this.resourceRequest).subscribe(res1 => {
            this.resourcename = res1;
            element.skills = element.skills.map(elem => elem.toString() + " - " + res1[elem]);
            element.datasets = element.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
          })
        });
      }
      return this.viewLists;
    }

    )
  }

  requestBuy() {
    for (var i = 0; i < this.items.length; i++) {
      this.requestBuyRes(this.items[i])
    }
  }

  requestBuyRes(resquestIdData) {
    this.listData.resourceId = resquestIdData.resourceId;
    this.resourceService.requestToBuy(this.listData).subscribe(res => {
      if (res) {
        this.toastr.success('Buy request successful', 'Success!');

      } else {
        this.toastr.error('Unable to Buy request', 'Oops!');
      }
    })
  }

  listChange() {
    for (var i = 0; i < this.items.length; i++) {
      this.listDataChange(this.items[i]);
    }
  }



  listDataChange(listitem) {
    if (listitem.forSale === false) {
      this.listData.resourceId = listitem.resourceId;
      this.listData.type = 'forSale';
      this.listData.value = true;
      this.resourceService.listResource(this.listData).subscribe(res => {
        this.getResourceData();
        if (res) {
          this.toastr.success('Resource successfully listed for Sale', 'Success!');
          this.type = "Unlist for sale";
        } else {
          this.toastr.error('Unable to update Resource', 'Oops!');
        }

      });
    } else {
      this.listData.resourceId = listitem.resourceId;
      this.listData.type = 'forSale';
      this.listData.value = false;
      this.resourceService.listResource(this.listData).subscribe(res => {
        this.getResourceData();
        if (res) {
          this.toastr.success('Resource successfully unlisted for Sale', 'Success!');
          this.type = "List for sale";
        } else {
          this.toastr.error('Unable to update Resource', 'Oops!');
        }
      });
    }
  }


  checkboxCheckedEvent(resource: any, event) {
    this.items = [];
    if (resource.forSale === false) {
      this.type = "List for sale";
    } else {
      this.type = "Unlist for sale";
    }

    if (resource.resourceId) {
      if (!resource.selected) {
        this.items.push(resource);
      } else {
        var index = this.items.indexOf(resource);
        if (index > -1) {
          this.items.splice(index, 1);
        }
      }
    } else {
      this.items = [];
    }

    if (event.target.checked) {
      this.disabledView = true;
      this.arrayInputElement = false;
      let username = localStorage.getItem('username');
      if (username === resource.owner) {
        this.disabledModify = true;
        this.requestView = false;
      } else {
        this.disabledModify = false;
        if (resource.forSale === true) {
          this.requestView = true;
        }
      }
    } else {
      this.disabledModify = false;
      this.disabledView = false;
    }
  }

  updateResource() {
    for (var i = 0; i < this.items.length; i++) {
      this.patchValueData(this.items[i]);
      this.selecteresourceId = this.items[i]
    }
  }

  createRBtn() {
    this.showResourceForm = true;
    this.resourceForm.reset();
  }

  dispalyCharts() {
    const color = function(d) {
      var colorPalet = ['#1f77b4', '#ff7f0e', '#aec7e8', '#2ca02c', '#ffbb78'];
      return colorPalet[d-1];
    }

    this.options = {
      chart: {
        type: 'forceDirectedGraph',
        height: 250,
        // width: (function () { return nv.utils.windowSize().width })(),
        width: 700,
        linkDist: 150,
        radius: 8,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        color: function (d) {
          return color(d.group)
        },
        legend: {
          enable: true,
        },


        nodeExtras: function (node) {
          node && node
            .append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .text(function (d) { return d.name })
            .style('font-size', '15px')
            .style('fill', '#fff');
        }
      }
    };



    this.data = {
      "nodes": [],
      "links": []
    }
  }

  jsonData() {
    if (this.viewLists) {

      this.resType = {
        agent: 1,
        skill: 2,
        dataset: 3,
        insight: 4,
        model: 5
      }

      for (const item of this.viewLists) {
        this.data.nodes.push(
          { "name": item.resourceName, "group": this.resType[item.resourceType] },
        );
        this.totalsource = item.skills.concat(item.datasets);

        this.elementskillArray = []
        for (const key in this.totalsource) {
          this.elementskill = this.totalsource[key];
          this.elementskillArray.push(this.elementskill)
        }
        this.newnames = [];
        this.data.nodes.forEach(element => {
          this.newnames.push(element.group);
        })
        this.indexvalue = this.data.nodes.findIndex(
          x => x.name == item.resourceName
        );
        if (this.indexvalue === 0) {
          continue;
        }
        
        this.data.links.push(
          { "source": this.indexvalue, "target": 0, "value": 2 },
        );
      };
    }
  }

  tableFormat() {
    this.graphVisualHide = false;
    this.tableHide = true;

  }
  graphVisualization() {
    this.graphVisualHide = true;
    this.tableHide = false;
  }

  viewPurchaseBtn() {
    this.resourceService.viewPurchase().subscribe(res => {
      const buyers = Object.keys(res);
      buyers.forEach(buyerResources => {
        this.buyerResource = buyerResources;
        this.purchaseLists = res[buyerResources];
        return this.buyerResource;
      }
      );

    })
  }

  sellResource(sellData) {    
    this.listData.resourceId = sellData.resourceId;
    this.listData.type = 'ownership';
    this.listData.value = this.buyerResource;
    this.resourceService.listResource(this.listData).subscribe(res => {
      if (res) {
        this.getResourceData();
        $(".view-purchase").modal("hide");
        this.toastr.success('Resource has been sold successfully', 'Success!');
      } else {
        this.toastr.error('Unable to sold Resource', 'Oops!');
      }
    })
  }
}
