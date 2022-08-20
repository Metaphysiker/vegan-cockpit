import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { Analysis } from '../analysis';

declare const wuTest: any;
declare const gapi: any;

@Component({
  selector: 'app-category-analytics',
  templateUrl: './category-analytics.component.html',
  styleUrls: ['./category-analytics.component.scss']
})
export class CategoryAnalyticsComponent implements OnInit {
  testicus = document.querySelector('#testicus');
  data_google_view_id = document.querySelector('#data-google-view-id');

  data_google_view_id_string: string = "";

  start_date = new FormControl(new Date('2022-01-01'));

  end_date = new FormControl(new Date());

  analysis_status = "idle";

  categories:any[] = []

  //blog_posts: [] = []


  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private wordpressService: WordpressService
    ) {

  }

  ngOnInit(): void {
    if(this.data_google_view_id != null){
      this.data_google_view_id_string = this.data_google_view_id.innerHTML.trim();
    }
  }

  onClick() {
    wuTest();
    console.log(gapi.client);
  }

  collectNumber(analysis: Analysis){
    console.log(analysis);
  }

  startAnalysis() {
    console.log("startAnalysis");
    this.analysis_status = "in_progress";

    var self = this;

    //start google query
    //if(this.data_google_view_id != null){

      //this.googleAnalyticsService.getDataFromGoogle(
      //  this.data_google_view_id_string,
      //    {
      //      startDate: this.start_date.value.toISOString().slice(0, 10),
      //      endDate: this.end_date.value.toISOString().slice(0, 10)
      //    },
      //  "/blog").then(
      //  function(value: any) {
      //      console.log(value);
      //      self.analysis_status = "idle";
      //  });
    //end google query
    //}

    this.wordpressService.getCategories()
    .subscribe((response: any) => {
      this.categories.push(response[0])
      //this.categories = [response[0]];
      //this.categories = response;
      //console.log(response);
    });



  }

}
