import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { BlockchainService } from '../../services/blockchain.service';
import { BlockChainRequest } from '../../modal/blockchainrequest';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-block-chain',
  templateUrl: './block-chain.component.html',
  styleUrls: ['./block-chain.component.scss']
})
export class BlockChainComponent implements OnInit {
  blockUserStats: BlockChainRequest = <BlockChainRequest>{};
  blockSummary: BlockChainRequest = <BlockChainRequest>{};
  transitions: any;
  constructor( public loginService: LoginService, private blockchainService: BlockchainService ) { }

  ngOnInit() {
    this.getTransactionsData();
    this.getBlockchain();
    this.loginService.show();

  }
  getBlockchain(){
    this.blockchainService.getBlockchainStats().subscribe(res =>{
      this.blockSummary = res.summary;
      this.blockUserStats = res.userStats;
    })
  }
  ngAfterViewInit(): void {
    $('[data-toggle="tooltip"]').tooltip(); 
  }
  getTransactionsData(){
    this.blockchainService.getTransactions().subscribe(res => {
      this.transitions = res;
    })
  }


}
