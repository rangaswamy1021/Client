import { Component, OnInit, transition } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';
import { BlockchainService } from '../services/blockchain.service';
import { ResourceRequest } from '../modal/resourcerequest';

declare let d3: any;

@Component({
  selector: 'app-resource-explorer',
  templateUrl: './resource-explorer.component.html',
  styleUrls: ['./resource-explorer.component.scss']
})
export class ResourceExplorerComponent implements OnInit {
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
  ownershipHead: ResourceRequest = <ResourceRequest>{};
  resHeadData: ResourceRequest = <ResourceRequest>{};
  resourceRequest: ResourceRequest = <ResourceRequest>{};
  ownerTrailData: any;
  viewLists: ResourceRequest[];
  ownershipdata: ResourceRequest;
  stateTrailData: any;
  stateTraildata: ResourceRequest[];
  decomViewData: any;
  searchData: any;
  disabledModify: boolean;
  items = [];
  resources: ResourceRequest[];
  transitions: any;
  constructor(private loginService: LoginService, private toastr: ToastrService,
    private blockchainService: BlockchainService) {

  }

  ngOnInit() {
    this.tableHide = true;
    this.items = [];
    this.getTransactionsData();
    this.getResourceData();
    this.loginService.navtophide();
    this.loginService.show();
  }

  getTransactionsData() {
    this.blockchainService.getTransactions().subscribe(res => {
      this.transitions = res;
    })
  }

  getResourceData() {
    this.blockchainService.getResource().subscribe(res => {
      this.resources = res;
      if (res) {
        this.resources.forEach(element => {
          let resArray = element.skills.concat(element.datasets)
          this.resourceRequest.resourceIds = resArray;
          this.blockchainService.displayResNames(this.resourceRequest).subscribe(res1 => {
            this.resourcename = res1;
            element.skills = element.skills.map(elem => elem.toString() + " - " + res1[elem]);
            element.datasets = element.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
          })
        });
      }
    })
  }


  checkboxCheckedEvent(resource: any, event) {
    this.items = [];
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
      this.disabledModify = true;
    } else {
      this.disabledModify = false;
    }
  }

  decomposedView() {
    for (var i = 0; i < this.items.length; i++) {
      this.decomViewData = this.items[i];
      this.displayView(this.decomViewData.resourceId)
    }
  }
  displayView(resId) {
    this.blockchainService.decomposedView(resId).subscribe(res => {
      this.viewLists = res;
      this.dispalyCharts();
      this.jsonData();
      if (res) {
        this.viewLists.forEach(element => {
          let resArray = element.skills.concat(element.datasets)
          this.resourceRequest.resourceIds = resArray;
          this.blockchainService.displayResNames(this.resourceRequest).subscribe(res1 => {
            this.resourcename = res1;
            element.skills = element.skills.map(elem => elem.toString() + " - " + res1[elem]);
            element.datasets = element.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
          })
        });

      }
    })
  }

  ownerTrailBtn() {
    for (var i = 0; i < this.items.length; i++) {
      this.ownerTrailData = this.items[i];
      this.displayOwnershipTrail(this.ownerTrailData.resourceId)
    }
  }
  displayOwnershipTrail(resId) {
    this.blockchainService.ownershipTrail(resId).subscribe(res => {
      this.ownershipdata = res;
      this.ownershipHead = res.resourceHead;
      this.ownershipdata = res.ownershipTrail;
      if (res) {
        this.ownershipHead
        let resArray = this.ownershipHead.skills.concat(this.ownershipHead.datasets)
        this.resourceRequest.resourceIds = resArray;
        this.blockchainService.displayResNames(this.resourceRequest).subscribe(res1 => {
          this.resourcename = res1;
          this.ownershipHead.skills = this.ownershipHead.skills.map(elem => elem.toString() + " - " + res1[elem] + "  ");
          this.ownershipHead.datasets = this.ownershipHead.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
        })

      }
    })
  }

  stateTrailBtn() {
    for (var i = 0; i < this.items.length; i++) {
      this.stateTrailData = this.items[i];
      this.displayStateTrail(this.stateTrailData.resourceId)
    }
  }
  displayStateTrail(resId) {
    this.blockchainService.stateTrail(resId).subscribe(res => {
      this.resHeadData = res.resourceHead;
      this.stateTraildata = res.stateTrail;
      if (res) {
        this.stateTraildata.forEach(element => {
          let resArray = element.skills.concat(element.datasets)
          this.resourceRequest.resourceIds = resArray;
          this.blockchainService.displayResNames(this.resourceRequest).subscribe(res1 => {
            this.resourcename = res1;
            element.skills = element.skills.map(elem => elem.toString() + " - " + res1[elem] + "  ");
            element.datasets = element.datasets.map(elem1 => elem1.toString() + " - " + res1[elem1]);
          })
        });
      }
    })
  }

  dispalyCharts() {
    const color = function (d) {
      var colorPalet = ['#1f77b4', '#ff7f0e', '#aec7e8', '#2ca02c', '#ffbb78'];
      return colorPalet[d - 1];
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
          this.newnames.push(element.name);
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




}
