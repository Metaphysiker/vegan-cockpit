import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    private http: HttpClient
  ) { }


  getData(): any {
    var data = ["abc", "def"];
    var url = 'https://reqres.in/api/users';

    //let queryParams = new HttpParams();
    //queryParams = queryParams.append("page",1);

    return this.http.get<any>('https://api.publicapis.org/entries');

    //return data;
  }

  getGoogleData(view_id: any, dateRange: any, relative_url: any): any {

  }

  getDataFromGoogle(view_id: any, dateRange: any, relative_url:any): any {

	return new Promise(function(resolve, reject)
  	{
  		gapi.client.request({
  			path: '/v4/reports:batchGet',
  			root: 'https://analyticsreporting.googleapis.com/',
  			method: 'POST',
  			body: {
  				reportRequests: [
  					{
  						viewId: view_id,
  						dateRanges: [dateRange],
  						metrics: [
  							{
  								expression: 'ga:users'
  							},
  							{
  								expression: 'ga:sessions'
  							},
  							{
  								expression: 'ga:uniquePageviews'
  							}
  						],
  						"dimensionFilterClauses": [
  						 {
  							"filters": [
  							{
  							 //"operator": "REGEXP",
  							 //https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
  							 "operator": "REGEXP",
  							 "dimensionName": "ga:pagePath",
  							 "expressions": [
  								 relative_url
  								]
  							}
  							]
  						 }
  						]
  					}
  				]
  			}
  		}).then(function(response: any){
  			//return response;
  			resolve(response);
  		},
      function(error: any){
        resolve(error);
      }
    )
  	})
  }


  getDataFromGoogleWithUserAgeBracketDimension(view_id: any, dateRange: any, relative_url:any): any {

  return new Promise(function(resolve, reject)
    {
      gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: view_id,
              dateRanges: [dateRange],
              metrics: [
                {
                  expression: 'ga:users'
                }
              ],
              "dimensions": [
              {
                "name":"ga:userAgeBracket"
              }],
              "dimensionFilterClauses": [
               {
                "filters": [
                {
                 //"operator": "REGEXP",
                 //https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
                 "operator": "REGEXP",
                 "dimensionName": "ga:pagePath",
                 "expressions": [
                   relative_url
                  ]
                }
                ]
               }
              ]
            }
          ]
        }
      }).then(function(response: any){
        //return response;
        resolve(response);
      },
      function(error: any){
        resolve(error);
      }
    )
    })
  }

}
