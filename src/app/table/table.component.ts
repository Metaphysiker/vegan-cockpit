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

  oldRows: any[] = [];

  @Input() rows: any[] =
    [
      {a: "123", b: "alphabet", c: "s.raess@me.com", d: 123},
      {a: "456", b: "camma", c: "sandro.raess@philosophie.ch", d: 345},
      {a: "789", b: "beta", c: "sandro@vegan.ch", d: 456},
      {a: "0.2", b: "beta", c: "sandro@vegan.ch", d: 0.2},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: "50"},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: "0"},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: " "},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: undefined},
      {a: " 50", b: "beta", c: "sandro@vegan.ch", d: "unknown" },
      {a: " 50", b: "beta", c: "sandro@vegan.ch" }

    ]

    totals: any = {};

  constructor() { }

  ngOnInit(): void {
    this.getTotals();
  }

  ngDoCheck(){
    console.log("ngDoCheck:");
    console.log(this.areEqual(this.rows, this.oldRows));

    if(this.areEqual(this.rows, this.oldRows)){

      this.getTotals();
      this.oldRows = [...this.rows];

    }

  }

  areEqual(array1: any, array2: any){
  if (array1.length === array2.length) {
    return array1.every((element: any, index: any) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });

    return false;
  }

  return false;
}

  addSomething(){
    console.log("add");
    this.rows.push(
      {a: "5555", b: "alphabet", c: "s.raess@me.com", d: 9876},
    )
  }

  getTotals(){

    this.totals = {};

    console.log("getTotals");
    console.log(this.rows[0]);
    console.log(Object.entries(this.rows[0]));

    for (var [key, value] of Object.entries(this.rows[0])) {
      this.totals[key] = 0;
    }

    for (let i = 0; i < this.rows.length; i++) {

      for (var [key, value] of Object.entries(this.rows[i])) {


        if(typeof value == 'number'){
          this.totals[key] += value;
        } else if (!isNaN(value as any)) {

          if(typeof parseInt(value as any) == 'number') {

            this.totals[key] += parseInt(value as any) || 0;
          }
          //this.totals[key] += parseInt(value as any);

        } else {
          this.totals[key] += 0;
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
