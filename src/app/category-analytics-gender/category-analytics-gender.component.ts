import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { GoogleAnalyticsService } from '../google-analytics.service';
import { WordpressService } from '../wordpress.service';

import { GenderAnalysis } from '../gender-analysis';
import { PieChartData } from '../pie-chart-data';

@Component({
  selector: 'app-category-analytics-gender',
  templateUrl: './category-analytics-gender.component.html',
  styleUrls: ['./category-analytics-gender.component.scss']
})
export class CategoryAnalyticsGenderComponent implements OnInit {

  data_google_view_id = document.querySelector('#data-google-view-id');

  data_google_view_id_string: string = "";

  start_date = new FormControl(new Date('2022-01-01'));

  end_date = new FormControl(new Date());

  analysis_status = "idle";

  categories:any[] = []

  rows_for_table_headers: any = [
    "category_name",
    "male",
    "female"
  ];

  rows_for_table: any = []

  categories_to_be_done:any[] = []

  categories_length: number = 0;

  analyses: GenderAnalysis[] = []

  pieChartDatas: PieChartData[] = []
  pieChartData: PieChartData | undefined;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private wordpressService: WordpressService
  ) { }

  ngOnInit(): void {
    if(this.data_google_view_id != null){
      this.data_google_view_id_string = this.data_google_view_id.innerHTML.trim();
    }
  }

  startAnalysis() {
    console.log("startAnalysis");
    this.analysis_status = "in_progress";

    var self = this;

    this.wordpressService.getCategories()
    .subscribe((response: any) => {

      //this.categories_length = 3;
      this.categories_length = response.length;
      this.categories_to_be_done = response;

      this.categories.push(this.categories_to_be_done.shift());

    });

  }

  fillRows():void {

    this.rows_for_table = this.analyses;
  }

  analysisComplete(analysis: GenderAnalysis){
    console.log(analysis);
    this.analyses.push(analysis);
    console.log("this.analyses: ");
    console.log(this.analyses);

    console.log(this.analyses.length);
    console.log(this.categories.length);

    if(this.analyses.length == this.categories_length) {
      this.analysis_status = "finished";
      console.log("ANALYSIS FINISHED");
      this.fillRows();
      //this.fillPieChartDatas();
    } else {
      this.categories.push(this.categories_to_be_done.shift());
      console.log("shift");
    }


  }

}
