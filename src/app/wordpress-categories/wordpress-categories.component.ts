import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wordpress-categories',
  templateUrl: './wordpress-categories.component.html',
  styleUrls: ['./wordpress-categories.component.scss']
})
export class WordpressCategoriesComponent implements OnInit {
  @Input() categories = [];

  constructor() { }

  ngOnInit(): void {
  }

}
