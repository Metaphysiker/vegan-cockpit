import { Component, OnInit } from '@angular/core';

import { PayrexxService } from '../payrexx.service';


@Component({
  selector: 'app-payrexx',
  templateUrl: './payrexx.component.html',
  styleUrls: ['./payrexx.component.scss']
})
export class PayrexxComponent implements OnInit {
  transactions: any = []

  constructor(
    private payrexxService: PayrexxService
  ) { }

  ngOnInit(): void {
    console.log("payrexx");
    //this.payrexxService.getPayrexxTransactions();
    this.transactions = this.payrexxService.getPayrexxTransactions();
    console.log(this.transactions);
    console.log(this.transactions["data"])
    //.subscribe((response: any) => {
    //  console.log(response);
    //});
  }

}
