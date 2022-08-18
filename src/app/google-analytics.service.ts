import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }


  getData(): any {
    var data = ["abc", "def"];
    return data;
  }

}
