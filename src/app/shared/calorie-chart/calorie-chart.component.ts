import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement} from 'chart.js';
import { staticValue, StaticMsg } from 'src/app/constants/constant';

@Component({
  selector: 'app-calorie-chart',
  templateUrl: './calorie-chart.component.html',
  styleUrls: ['./calorie-chart.component.scss']
})
export class CalorieChartComponent implements OnInit, AfterViewInit {

  @Input() cartData: any;
  @ViewChild('myChart') myChart: any;
  canvas: any;
  chartBackGroudColor = staticValue.chartBackgroudColor;
  data = {
    labels: [],
    datasets: [{
      label: StaticMsg.calorie_lable,
      data: [],
      backgroundColor: [],
      hoverOffset: staticValue.calorieHoverOffset
    }]
  };
  constructor() {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement);
   }

  ngOnInit(): void {
    this.createDatasetForChart(this.cartData);
  }

  createDatasetForChart(cartData: any): void{
    let cLabels = [];
    let cData = [];
    for(let x in cartData){
      let calorie = "";
      calorie = x.substring(4);
      cLabels.push(calorie);
      cData.push(cartData[x]);
    }
    this.data.labels = cLabels;
    this.data.datasets[0].data = cData;
    this.data.datasets[0].backgroundColor = this.chartBackGroudColor;
  }

  ngAfterViewInit(): void {
    this.canvas = this.myChart.nativeElement.getContext('2d');
    new Chart(this.canvas, {
      type: StaticMsg.calorie_chart_type,
      data: this.data
    });
  }

}
