import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  selector: 'app-category-analytics',
  templateUrl: './category-analytics.component.html',
  styleUrls: ['./category-analytics.component.scss']
})
export class CategoryAnalyticsComponent implements OnInit {
  testicus = document.querySelector('#testicus');


  start_date = new FormControl(new Date('2022-01-01'));

  end_date = new FormControl(new Date());

  analysis_status = "idle";




  constructor(
    private googleAnalyticsService: GoogleAnalyticsService
    ) {

  }

  ngOnInit(): void {

  }

  startAnalysis() {
    console.log("startAnalysis");
    this.analysis_status = "in_progress";
    console.log(this.analysis_status);

    if(this.testicus != null){
      console.log(this.testicus.innerHTML);
    }


    this.googleAnalyticsService.getData().subscribe((data: any) => {
      console.log(data)
    })
  }

}
