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

  //vegan_cockpit/v1/get_payrexx_transactions/0/2/2022-01-01/2022-06-01

  getPayrexxTransactionsBatch(offset: any = 0, limit: any = 100): any {
    console.log("get Batch")
    //http://localhost/wp-json/vegan_cockpit/v1/get_payrexx_transactions/0/1/2022-01-01/2022-06-01
    //vegan_cockpit/v1/get_payrexx_transactions/0/2/2022-01-01/2022-06-01
    var url = "http://localhost/wp-json/vegan_cockpit/v1/get_payrexx_transactions/"+ offset + "/" + limit + "/2022-01-01/2022-01-02";
    //http://localhost/wp-json/vegan_cockpit/v1/get_payrexx_transactions/0/2/2022-01-01/2022-06-01
    console.log(url);
    return this.http.get<any>(url);

  }

  getPayrexxTransactionsBatch12345(offset: any = 0, limit: any = 100): any {
    console.log("get Batch")

    var self = this;

        const encodedParams = new URLSearchParams();

        encodedParams.set('orderByTime', 'ASC');
        encodedParams.set('filterDatetimeUtcGreaterThan', '2022-01-01 00:00:00');
        encodedParams.set('filterDatetimeUtcLessThan', '2022-08-01 00:00:00');
        encodedParams.set('offset', offset.toString() ); //Achtung vielleicht String
        encodedParams.set('limit', limit.toString()); // ACHTUNG - vielleicht braucht es hier String
        console.log(encodedParams.toString());

        var apiSignature = self.buildSignature(encodedParams.toString())

        const url = 'https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz' + "&ApiSignature=" + apiSignature + "&" + encodedParams.toString();
        console.log("url: ")
        console.log(url)
        const options = {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: encodedParams
        };

        return this.http.get<any>(url);

  }

  getPayrexxTransactionsBatch5(offset: any = 0, limit: any = 100): any {
    console.log("get Batch")

    var self = this;

    return new Promise(function(final_resolve, final_reject){

        const encodedParams = new URLSearchParams();

        encodedParams.set('orderByTime', 'ASC');
        encodedParams.set('filterDatetimeUtcGreaterThan', '2022-01-01 00:00:00');
        encodedParams.set('filterDatetimeUtcLessThan', '2022-02-01 00:00:00');
        encodedParams.set('limit', limit); // ACHTUNG - vielleicht braucht es hier String
        encodedParams.set('offset', offset ); //Achtung vielleicht String
        console.log(encodedParams.toString());

        var apiSignature = self.buildSignature(encodedParams.toString())
        console.log(apiSignature);

        const url = 'https://api.payrexx.com/v1.0/Transaction/?instance=veganegesellschaftschweiz' + "&ApiSignature=" + apiSignature + "&" + encodedParams.toString();
        console.log("url: ")
        console.log(url)
        const options = {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: encodedParams
        };




        fetch(url)
          .then((res: any) => {
            console.log(res);
            self.transactions = [
              ...self.transactions,
              ...res["data"]
            ];
            console.log(self.transactions);
            console.log("Data:");
            console.log(res["data"]);
            final_resolve(res["data"]);
          });

     })

  }

  async doSomething() {
      //for (item of items) {
      //    await promiseAction(item)
      //}
  }

  loop(offset: number = 0, limit: number = 100): any {
    var self = this;
    //return new Promise(function(final_resolve, final_reject){



    console.log("inside loop");
    console.log(offset)
    console.log(limit)
      //var offset = 0;
      //var limit = 100;

      self.getPayrexxTransactionsBatch(offset, limit)
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

  getPayrexxTransactions(): any {
    var self = this;

    return self.loop(0, 100);

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
