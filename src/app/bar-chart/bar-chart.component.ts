import { Component, OnInit, Input, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild('bar_chart') barChart: any;

  @Input() barChartData: any = {
     labels: ["abc", "def"],
     data: [5, 10, 15, 10, 3, 0],
     text: "custom text"
    }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.draw_chart()
}

  draw_chart(): void {

    new Chart(this.bar_chart.nativeElement, {
        type: 'bar',
        data: {
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          data: [10, 20, 30, 40, 50, 60, 70]
          }]
        },
        options: {

        }
    });

  }

}
