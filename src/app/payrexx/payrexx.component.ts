import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { PayrexxService } from '../payrexx.service';

import { PayrexxOptions } from '../payrexx-options';

@Component({
  selector: 'app-payrexx',
  templateUrl: './payrexx.component.html',
  styleUrls: ['./payrexx.component.scss']
})
export class PayrexxComponent implements OnInit {
  transactions: any = []
  headers_for_transactions: any = ["amount", "firstname", "lastname", "time", "user_id"]

  data_wordpress_nonce = document.querySelector('#data-wordpress-nonce');

  data_wordpress_nonce_string: string = "";


  //data_wordpress_json_endpoint = document.querySelector('link[rel="https://api.w.org/"]') as HTMLAnchorElement | null;

  //data_wordpress_json_endpoint: any = document.querySelector('link[rel="https://api.w.org/"]').href | "nichts";

  data_wordpress_json_endpoint = document.querySelector('#data_wordpress_json_endpoint');

  data_wordpress_json_endpoint_string: string = "";

  constructor(
    private payrexxService: PayrexxService
  ) { }

  ngOnInit(): void {

    if(this.data_wordpress_nonce != null){
      this.data_wordpress_nonce_string = this.data_wordpress_nonce.innerHTML.trim();
      console.log(this.data_wordpress_nonce_string);
    }

    if(this.data_wordpress_json_endpoint != null){
      this.data_wordpress_json_endpoint_string = this.data_wordpress_json_endpoint.innerHTML.trim();
      console.log(this.data_wordpress_json_endpoint_string);
    } else {
      console.log("endpoint not found");
    }

    console.log("payrexx");
    //this.payrexxService.getPayrexxTransactions();
    //this.transactions = this.payrexxService.getPayrexxTransactions();
    console.log("getPayrexxTransactions in component");
    //console.log(this.payrexxService.getPayrexxTransactions())

    //.then((response: any) => {
    //  console.log("PAYREXX COMPONENT");
    //  console.log(response);
    //  this.transactions = response;
    //});
    //.subscribe((response: any) => {
    //  console.log(response);
    //});
  }

  startAnalysis(payrexxOptions: PayrexxOptions){
    console.log("payrexx.component");
    console.log(payrexxOptions);

    this.payrexxService.getPayrexxTransactions(this.data_wordpress_nonce_string, this.data_wordpress_json_endpoint_string, payrexxOptions)
      .then((response: any)=> {
        console.log(response)
        this.transactions = response;
      })
  }

}
