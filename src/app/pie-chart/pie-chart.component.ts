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
            backgroundColor: ["#DFFF00", "#FFBF00","#FF7F50","#DE3163","#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF", "#4C3A51", "#774360"],
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
