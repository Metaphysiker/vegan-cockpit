import { Component, OnInit, Input, ViewChild  } from '@angular/core';

declare const Chart: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild('bar_chart') bar_chart: any;

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

    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];

    var mybarChart = new Chart(this.bar_chart.nativeElement, {
  type: 'bar',
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },

  options: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: "#000080",
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

  }

}
