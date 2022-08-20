import { Component, OnInit, Input } from '@angular/core';
import { PieChartData } from '../pie-chart-data';

declare const Chart: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {



  @Input() pieChartData: PieChartData = {
     labels: ["abc", "def"],
     data: [5, 10],
     text: "custom text"
    }

  constructor() { }

  ngOnInit(): void {
    this.draw_pie()
  }

  draw_pie(): void {

    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
          labels: this.pieChartData["labels"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: this.pieChartData["data"]
          }]
        },
        options: {
          title: {
            display: true,
            text: this.pieChartData["text"]
          }
        }
    });

  }

}
