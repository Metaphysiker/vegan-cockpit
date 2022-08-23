import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

//declare const sha256: any;
//import hmacSHA256 from 'crypto-js/hmac-sha256';
//declare const hmacSHA256: any;
//declare const base64: any;
declare const CryptoJS: any;
//import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class PayrexxService {

  payrexxapikey = "UtHq3p0TYZEQCOnBN2bsft5gEeWpTj";

  constructor(
    private http: HttpClient
  ) { }

  getPayrexxTransactions(): any {
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

  getPayrexxTransactions2(): any {

    let params = new HttpParams({
     fromObject: {
       filterMyTransactionsOnly: false,
       orderByTime: 'ASC',
       filterDatetimeUtcGreaterThan: '2022-01-01 00:00:00'
     }
   });

   let httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
   };

    var apiSignature = this.buildSignature(params.toString());

    //var url = "https://api.payrexx.com/v1.0/SignatureCheck/?instance=veganegesellschaftschweiz&ApiSignature=" + apiSignature;

    var url = 'https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&ApiSignature=' + apiSignature;

    console.log(url);
    return this.http.post(url, params.toString(), httpOptions)
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
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(query, this.payrexxapikey))
  }


}
