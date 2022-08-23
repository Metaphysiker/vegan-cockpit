import { Component, OnInit } from '@angular/core';

import { PayrexxService } from '../payrexx.service';


@Component({
  selector: 'app-payrexx',
  templateUrl: './payrexx.component.html',
  styleUrls: ['./payrexx.component.scss']
})
export class PayrexxComponent implements OnInit {

  constructor(
    private payrexxService: PayrexxService
  ) { }

  ngOnInit(): void {
    console.log("payrexx");
    //this.payrexxService.getPayrexxTransactions();

    this.payrexxService.getPayrexxTransactions();
    //.subscribe((response: any) => {
    //  console.log(response);
    //});
  }

}
