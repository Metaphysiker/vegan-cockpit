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
  payrexxapikey = document.querySelector('#data-payrexx-api-key');
  payrexxapikey_string: string = "";

  transactions: any = [];

  constructor(
    private http: HttpClient
  ) {
    if(this.payrexxapikey != null){
      this.payrexxapikey_string = this.payrexxapikey.innerHTML.trim();
    }
  }

  getPayrexxTransactionsBatch(offset = 0, limit = 100): any {
    console.log("get Batch")

    var self = this;

    return new Promise(function(final_resolve, final_reject){

        const encodedParams = new URLSearchParams();

        encodedParams.set('orderByTime', 'ASC');
        encodedParams.set('filterDatetimeUtcGreaterThan', '2022-01-01 00:00:00');
        encodedParams.set('filterDatetimeUtcLessThan', '2022-08-01 00:00:00');
        encodedParams.set('limit', limit.toString()); // ACHTUNG - vielleicht braucht es hier String
        encodedParams.set('offset', offset.toString() ); //Achtung vielleicht String
        console.log(encodedParams.toString());

        var apiSignature = self.buildSignature(encodedParams.toString())
        console.log(apiSignature);

        const url = 'https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz' + "&ApiSignature=" + apiSignature + "&" + encodedParams.toString();
        console.log("url: ")
        console.log(url)
        const options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: encodedParams
        };

        fetch(url)
          .then(res => res.json())
          .then(json => {
            console.log(json);
            self.transactions = [
              ...self.transactions["data"],
              ...json
            ];
            console.log(self.transactions);
            console.log("Data:");
            console.log(self.transactions["data"]);
            final_resolve(json);
          })
          .catch(err => final_reject(err));

     })

  }

  getPayrexxTransactions(): any {

    console.log("getPayrexxTransactions");

    var offset = 0;
    var limit = 100;

    this.getPayrexxTransactionsBatch(offset, limit)
      .then((transactions: any) => {

        offset++;
        console.log(offset);
        console.log(this.transactions.length);

        while ( offset * limit == this.transactions.length) {
          this.getPayrexxTransactionsBatch(offset, limit)
            .then((transactions: any) => {
              offset++;
              console.log(offset);
              console.log(limit);
              console.log(this.transactions.length);
            },
            (error: any) => {
              offset++;
            }
          )
        }



      })



    //return this.transactions

  }

  getPayrexxTransactions12(): any {

    //works:
    //      model: "Page",
    //      id: 17,
    //      limit: 100,

    let params: any = {
      orderByTime: 'ASC',
      //filterDatetimeUtcGreaterThan: "2021-02-05 11:04:04",
      //filterDatetimeUtcLessThan: '2022-01-01 00:00:00',
      limit: 100,
    }

    let queryParams = Object.assign({}, params)
    var queryStr = Qs.stringify(queryParams)

    console.log("queryStr")
    console.log(queryStr)

    queryStr = encodeURI(queryStr);

    let apiSignature = this.buildSignature(queryStr)
    queryParams.ApiSignature = apiSignature

    //queryParams.ApiSignature = this.buildSignature(queryStr)
    console.log(queryParams)

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    };

    //var url = "https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&" + encodeURI(queryStr) +"&ApiSignature=" + apiSignature;
    // url = "https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&" + encodeURI(queryStr) +"&ApiSignature=" + apiSignature;

    var url = "https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&" + queryStr +"&ApiSignature=" + apiSignature;

    console.log("FINAL URL: ");
    console.log(url);
    //return this.http.post(url, queryParams, httpOptions)
    //return this.http.get(url, httpOptions)

    return this.http.get(url)



  }

  getPayrexxTransactions5(): any {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(
        {
          filterMyTransactionsOnly: "false",
          orderByTime: 'ASC'
        }
        )
    };

    console.log(JSON.stringify(options.toString()))

  fetch('https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  }

  getPayrexxTransactions9(): any {


    let params = new HttpParams({
     fromObject: {
       filterMyTransactionsOnly: false,
       orderByTime: 'ASC',
       filterDatetimeUtcGreaterThan: '2022-01-01 00:00:00'
     }
   });

   let params_query = "orderByTime=ASC&filterMyTransactionsOnly=false";

   let httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
   };

    var apiSignature = this.buildSignature(params_query);

    //var url = "https://api.payrexx.com/v1.0/SignatureCheck/?instance=veganegesellschaftschweiz&ApiSignature=" + apiSignature;

    var url = 'https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&ApiSignature=' + apiSignature + "?" + params_query;

    console.log(url);
    return this.http.get<any>(url)
    //return this.http.get<any>(url);


    //const options = {method: 'GET', headers: {Accept: 'application/json'}};

//fetch('https://api.payrexx.com/v1.0/SignatureCheck/?instance=veganegesellschaftschweiz', options)
//  .then(response => response.json())
//  .then(response => console.log(response))
//  .catch(err => console.error(err));


  }

  getPayrexxTransactions1(): any {

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }//,6
      //body: new URLSearchParams({filterMyTransactionsOnly: "false", orderByTime: 'ASC'})
    };

    fetch('https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }

  getTransactions(): any {
    const instance = "veganegesellschaftschweiz";
    let queryParams = Object.assign({}, "params")
    //const queryStr = qs.stringify(queryParams)
    //queryParams.ApiSignature = this.buildSignature(queryStr)

  }

  buildSignature (query = '') {
    //console.log(this.payrexxapikey_string);
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(query, this.payrexxapikey_string))
    //return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256('', this.payrexxapikey_string))

  }


}
