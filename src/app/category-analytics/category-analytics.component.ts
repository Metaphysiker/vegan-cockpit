import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { Analysis } from '../analysis';
import { PieChartData } from '../pie-chart-data';


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

  categories_to_be_done:any[] = []

  categories_length: number = 0;

  analyses: Analysis[] = []

  pieChartDatas: PieChartData[] = []
  pieChartData: PieChartData | undefined;

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

  analysisComplete(analysis: Analysis){
    console.log(analysis);
    this.analyses.push(analysis);
    console.log("this.analyses: ");
    console.log(this.analyses);

    console.log(this.analyses.length);
    console.log(this.categories.length);

    if(this.analyses.length == this.categories_length) {
      this.analysis_status = "finished";
      console.log("ANALYSIS FINISHED");
      this.fillPieChartDatas();
    } else {
      this.categories.push(this.categories_to_be_done.shift());
      console.log("shift");
    }


  }

  fillPieChartDatas() {

    var labels: string[] = [];
    var data: number[] = [];
    var text: string = "users";

    for (let i = 0; i < this.analyses.length; i++) {
      labels.push(String(this.analyses[i]["category_id"]));
      data.push(this.analyses[i]["users"]);
    }

    this.pieChartData = {
        labels: labels,
        data: data,
        text: text
      }

      console.log(this.pieChartData);


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
      //this.categories_length = response.length;
      this.categories_length = 2;
      this.categories_to_be_done = response;

      this.categories.push(this.categories_to_be_done.shift());
      //this.categories.push(response[0])
      //this.categories = [response[0]];
      //this.categories = response;
      //console.log(response);
    });



  }

}
