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
      {a: "123", b: "alphabet", c: "s.raess@me.com"},
      {a: "456", b: "camma", c: "sandro.raess@philosophie.ch"},
      {a: "789", b: "beta", c: "sandro@vegan.ch"}
    ]

  constructor() { }

  ngOnInit(): void {
  }

  sort(key: any, order: string): void {



    this.rows.sort((a, b) => {
      return a[key].localeCompare(b[key])
    });

    if(order == 'ASC'){
      this.rows.reverse();
    }
  }

}
