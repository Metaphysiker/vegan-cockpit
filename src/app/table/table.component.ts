import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: any[] = [
    "a", "b", "c", "d"
  ]

  @Input() rows: any[] =
    [
      {a: "123", b: "alphabet", c: "s.raess@me.com", d: 123},
      {a: "456", b: "camma", c: "sandro.raess@philosophie.ch", d: 345},
      {a: "789", b: "beta", c: "sandro@vegan.ch", d: 456},
      {a: "0.2", b: "beta", c: "sandro@vegan.ch", d: 0.2},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: 50}
    ]

    totals: any = {};

  constructor() { }

  ngOnInit(): void {
    this.getTotals();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.getTotals();
  }

  getTotals(){

    this.totals = {};

    for (var [key, value] of Object.entries(this.rows[0])) {
      this.totals[key] = 0;
    }

    for (let i = 0; i < this.rows.length; i++) {

      for (var [key, value] of Object.entries(this.rows[i])) {
        if(typeof value == 'number'){
          this.totals[key] += value;
        } else {
          this.totals[key] += 1;
        }
      }

    }

  }

  sort(key: any, order: string): void {

    if (isNaN(this.rows[0][key])) {

      this.rows.sort((a, b) => {
        return a[key].toString().localeCompare(b[key].toString());
      });

    } else {
      this.rows.sort((a, b) => {
        return a[key] - b[key];
      });
    }

    if(order == 'ASC'){
      this.rows.reverse();
    }
  }

}
