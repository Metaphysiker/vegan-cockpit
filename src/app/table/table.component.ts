import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: any[] = [
    "a", "b", "c"
  ]

  @Input() rows: any[] =
    [
      {a: "123", b: "234", c: "345"},
      {a: "456", b: "567", c: "678"},
      {a: "789", b: "889", c: "899"}
    ]

  constructor() { }

  ngOnInit(): void {
  }

  sort(key: any): void {
    this.rows.sort((a, b) => {
      return b[key] - a[key]
    });
  }

}
