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
    return data;
  }

}
