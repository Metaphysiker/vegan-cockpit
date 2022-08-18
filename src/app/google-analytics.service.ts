import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

}
