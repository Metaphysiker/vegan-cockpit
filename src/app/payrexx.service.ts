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
//import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class PayrexxService {

  //payrexxapikey = "23zkRkQAjcjlJdENtbysNI2lueYRIM";
  payrexxapikey = document.querySelector('#data-payrexx-api-key');
  payrexxapikey_string: string = "";

  constructor(
    private http: HttpClient
  ) {
    if(this.payrexxapikey != null){
      this.payrexxapikey_string = this.payrexxapikey.innerHTML.trim();
    }
  }

  getPayrexxTransactions(): any {
    let params: any = {
      model: "Page",
      id: 17,
    }
    let queryParams = Object.assign({}, params)
    const queryStr = Qs.stringify(queryParams)
    let apiSignature = this.buildSignature(queryStr)
    queryParams.ApiSignature = apiSignature

    //queryParams.ApiSignature = this.buildSignature(queryStr)
    console.log(queryParams)

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    };

    var url = "https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz&" + encodeURI(queryStr) +"&ApiSignature=" + apiSignature;

    console.log(url);
    console.log(encodeURI(queryStr));
    return this.http.post(url, queryParams, httpOptions)


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
    console.log(this.payrexxapikey_string);
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(query, this.payrexxapikey_string))
  }


}
