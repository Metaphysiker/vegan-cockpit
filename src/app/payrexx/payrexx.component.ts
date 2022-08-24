import { Component, OnInit } from '@angular/core';

import { PayrexxService } from '../payrexx.service';


@Component({
  selector: 'app-payrexx',
  templateUrl: './payrexx.component.html',
  styleUrls: ['./payrexx.component.scss']
})
export class PayrexxComponent implements OnInit {
  transactions: any = []
  headers_for_transactions: any = ["amount", "id", "status"]

  constructor(
    private payrexxService: PayrexxService
  ) { }

  ngOnInit(): void {
    console.log("payrexx");
    //this.payrexxService.getPayrexxTransactions();
    //this.transactions = this.payrexxService.getPayrexxTransactions();
    console.log("getPayrexxTransactions in component");
    //console.log(this.payrexxService.getPayrexxTransactions())

    this.payrexxService.getPayrexxTransactions()
    .then((response: any) => {
      this.transactions = response;
    });
    //.subscribe((response: any) => {
    //  console.log(response);
    //});
  }

}
