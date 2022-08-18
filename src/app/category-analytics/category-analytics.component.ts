import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-category-analytics',
  templateUrl: './category-analytics.component.html',
  styleUrls: ['./category-analytics.component.scss']
})
export class CategoryAnalyticsComponent implements OnInit {
  start_date = new FormControl(new Date('2022-01-01'));

  end_date = new FormControl(new Date());

  constructor() { }

  ngOnInit(): void {


  }

}
