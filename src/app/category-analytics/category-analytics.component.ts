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
  //testicus = document.querySelector('#testicus');
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

    this.analyses.push(analysis);

    if(this.analyses.length == this.categories_length) {
      this.analysis_status = "finished";
      this.fillPieChartDatas();
    } else {
      this.categories.push(this.categories_to_be_done.shift());
    }


  }

  fillPieChartData(analyses: Analysis[], metric: "users" | "sessions" | "pageviews"): PieChartData {
    console.log("fillPieChartData");

    var labels: string[] = [];
    var data: number[] = [];
    var sorted_array = analyses.sort(function(a, b){return b[metric] - a[metric]});

    for (let i = 0; i < sorted_array.length; i++) {
      console.log(sorted_array[i][metric]);
      labels.push(sorted_array[i]["category_name"] +  ": " + sorted_array[i][metric]);
      data.push(sorted_array[i][metric]);
    }

    return {
        labels: labels,
        data: data,
        text: metric
      }
  }

  fillPieChartDatas(): void {

    var pie_chart_data_users = this.fillPieChartData(this.analyses, "users");
    var pie_chart_data_sessions = this.fillPieChartData(this.analyses, "sessions");
    var pie_chart_data_pageviews = this.fillPieChartData(this.analyses, "pageviews");

      this.pieChartDatas =
        [
          pie_chart_data_users,
          pie_chart_data_sessions,
          pie_chart_data_pageviews
        ]


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
      this.categories_length = response.length;
      //this.categories_length = 2;
      this.categories_to_be_done = response;

      this.categories.push(this.categories_to_be_done.shift());
      //this.categories.push(response[0])
      //this.categories = [response[0]];
      //this.categories = response;
      //console.log(response);
    });

  }

}
