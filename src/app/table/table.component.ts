import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
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
