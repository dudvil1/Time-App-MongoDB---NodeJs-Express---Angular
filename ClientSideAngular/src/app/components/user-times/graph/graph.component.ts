import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "canvasjs/canvasjs.min.js";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  constructor() {}

  ngOnInit() {
   this.madeGraph(9);
  }
  graghOps(){
    return {
      title: {
        text: "Working hours in months"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { y: 1, label: "Jan" },
            { y: 55, label: "Feb" },
            { y: 50, label: "Mar" },
            { y: 65, label: "Apr" },
            { y: 95, label: "May" },
            { y: 68, label: "June" },
            { y: 28, label: "July" },
            { y: 34, label: "Aug" },
            { y: 14, label: "Sep" },
            { y: 34, label: "Oct" },
            { y: 34, label: "Nov" },
            { y: 34, label: "Dec" }
          ]
        }
      ]
    }
  }

  madeGraph(numOfCollums: any) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Working hours in months"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { y: 1, label: "Jan" },
            { y: 55, label: "Feb" },
            { y: 50, label: "Mar" },
            { y: 65, label: "Apr" },
            { y: 95, label: "May" },
            { y: 68, label: "June" },
            { y: 28, label: "July" },
            { y: 34, label: "Aug" },
            { y: 14, label: "Sep" },
            { y: 34, label: "Oct" },
            { y: 34, label: "Nov" },
            { y: 34, label: "Dec" }
          ]
        }
      ] 
    });
    chart.render();
  }
}
