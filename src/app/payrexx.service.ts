import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { PayrexxOptions } from './payrexx-options';
import { PayrexxTransaction } from './payrexx-transaction';


//declare const sha256: any;
//import hmacSHA256 from 'crypto-js/hmac-sha256';
//declare const hmacSHA256: any;
//declare const base64: any;
declare const CryptoJS: any;
declare const Qs: any;
//declare const fetch: any;
//import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class PayrexxService {

  //payrexxapikey = "23zkRkQAjcjlJdENtbysNI2lueYRIM";
  //payrexxapikey = document.querySelector('#data-payrexx-api-key');
  //payrexxapikey_string: string = "";

  transactions: PayrexxTransaction[] = [];
  offset: number = 0;
  limit: number = 100;
  startdate: string = "2022-01-01";
  enddate: string = "2022-02-20";
  wordpress_nonce: any = "e92b9b2d2d";
  data_wordpress_json_endpoint_string: any = "nothing";
  payrexxOptions: PayrexxOptions = {
    start_date: new Date('2022-01-01'),
    end_date: new Date()
  }

  constructor(
    private http: HttpClient
  ) {
    //if(this.payrexxapikey != null){
    //  this.payrexxapikey_string = this.payrexxapikey.innerHTML.trim();
    //}
  }

  getPayrexxTransactionsBatch(): any {
    var self = this;
    console.log("get Batch");
    console.log("count transactions: ");
    console.log(self.transactions.length);
    console.log("offset: " + self.offset);
    console.log("limit: " + self.limit);
    var url = this.data_wordpress_json_endpoint_string + "vegan_cockpit/v1/get_payrexx_transactions/"+ this.offset + "/" + this.limit + "/" + this.payrexxOptions.start_date.toISOString().split('T')[0] + "/" + this.payrexxOptions.end_date.toISOString().split('T')[0] + "?_wpnonce=" + this.wordpress_nonce;
    console.log(url);

    return new Promise(function(final_resolve, final_reject){

      fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {

        for (let i = 0; i < data.length; i++) {
          self.transactions.push(
            {
              amount: data[i]["amount"] / 100,
              firstname: data[i]["firstname"],
              lastname: data[i]["lastname"],
              time: data[i]["time"],
              user_id: data[i]["user_id"],
              status: data[i]["status"]
            }
          )
        }

        final_resolve(data);

      })

    });


    //return this.http.get<any>(url);

  }


  loop(offset: number = 0, limit: number = 100): any {
    var self = this;
    //return new Promise(function(final_resolve, final_reject){



    console.log("inside loop");
    console.log(offset)
    console.log(limit)
      //var offset = 0;
      //var limit = 100;

      self.getPayrexxTransactionsBatch()
      .subscribe((response: any) => {
        console.log("then subscribe");
        console.log(response);
        self.transactions = [
          ...self.transactions,
          ...response
        ]

        console.log("self.transactions");
        console.log(self.transactions)

        if (response.length == limit) {
          //return self.loop(offset + 1, limit)
          return self.loop(offset + limit, limit)

        } else {
          console.log('yay');
          console.log(self.transactions);
          //final_resolve(self.transactions);
          return this.transactions;
        }

      })

    //})
  }

  checkIfAnotherBatchIsNecessary(): any {
    if(this.transactions.length == this.offset * this.limit){
      return true
    } else {
      return false
    }
  }

  looper(resolve: any): any {
    console.log("LOOPER");
    var self = this;

    return new Promise(function(final_resolve, final_reject){
      self.getPayrexxTransactionsBatch()
        .then((response:any) => {

          console.log("LOOPER CHECK");
          console.log(response.length);
          console.log(self.limit);
          console.log(response.length == self.limit);
          if(response.length == self.limit){
            self.offset = self.offset + self.limit;
            self.looper(resolve);
          } else {
            console.log("FINAL RESOLVE!");
            console.log(self.transactions);
            resolve("yay");
          }

        })
    })


  }

  getPayrexxTransactions(wordpress_nonce: any = "", data_wordpress_json_endpoint_string: any = "", payrexxOptions: PayrexxOptions): any {
    var self = this;
    this.wordpress_nonce = wordpress_nonce;
    this.data_wordpress_json_endpoint_string = data_wordpress_json_endpoint_string;
    this.payrexxOptions = payrexxOptions;

    return new Promise(function(final_resolve, final_reject){
      new Promise((r, j) => {
          self.looper(r);
      }).then((result: any) => {
          //This will call if your algorithm succeeds!
          console.log("omg");
          final_resolve(self.transactions);

      });
    })

  }


}
