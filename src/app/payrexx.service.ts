import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  transactions: any = [];
  offset: number = 0;
  limit: number = 100;
  startdate: string = "2022-01-01";
  enddate: string = "2022-01-20";

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
    var url = "http://localhost/wp-json/vegan_cockpit/v1/get_payrexx_transactions/"+ this.offset + "/" + this.limit + "/" + this.startdate + "/" + this.enddate;
    console.log(url);

    return new Promise(function(final_resolve, final_reject){

      fetch(url)
      .then((response: any) => response.json())
      .then((data: any) => {

        self.transactions = [
          ...data,
          self.transactions];

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

          if(self.transactions.length == self.offset * self.limit){
            self.looper(final_resolve);
          } else {
            console.log("FINAL RESOLVE!");
            resolve("yay");
          }

        })
    })


  }

  getPayrexxTransactions(): any {
    var self = this;

    return new Promise(function(final_resolve, final_reject){
      new Promise((r, j) => {
          self.looper(r);
      }).then((result) => {
          //This will call if your algorithm succeeds!
          console.log("omg");
          final_resolve(self.transactions);

      });
    })

  }


}
