import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { map, take } from 'rxjs/operators';
import { UtilityService } from 'src/app/services/utility.service';
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement} from 'chart.js';
import { staticValue, admin_headers, StaticMsg } from 'src/app/constants/constant';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  adminDashboardOrderAnalysisHeader: any[] = admin_headers.dashboardOrderAnalysis;
  adminItemAnalysisHeader: any[] = admin_headers.dashboardItemAnalysis;
  getOrderSubscription: Subscription | undefined;
  getDishSubscription: Subscription | undefined;
  orders: any;
  dishes: any;
  ordersCount : any = {};
  itemAnalysisAvailable: boolean = false;
  itemAnalysisData: any[] = [];
  itemAnalysisVegData: any[] = [];
  itemAnalysisNonVegData: any[] = [];

  /*item analysis chart configuration */
  @ViewChild('itemChart') itemChart: any;
  canvas: any;
  chartBackGroudColor = staticValue.itemBackgroudColor;
  data = {
    labels: [],
    datasets: [{
      label: StaticMsg.admin_dashboard_table_lable,
      data: [],
      backgroundColor: [],
      hoverOffset: staticValue.calorieHoverOffset
    }]
  };

  /*
    -------------------------------------
    item section
    -------------------------------------
    price section
    -------------------------------------
    payment mode section (how many CASH/CARD/UPI in chart)
    -------------------------------------
*/
  constructor(private adminService: AdminService,
              private utilityService: UtilityService,
              public appCacheService: AppCacheService) { 
                Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement);
              }

  ngOnInit(): void {
    this.getAllOrders();
    this.getDishes();
  }

  //&& (res[key][key1].orderStatus == 'ordered' || res[key][key1].orderStatus == 'intrans')
  //above code is for 'ordered' & 'intrans' cases
  getAllOrders(){
    this.getOrderSubscription = this.adminService.getAllOrders().pipe(map(res=>{
      let data = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            for(let key1 in res[key]){
              if(res[key].hasOwnProperty(key1)){//checking all orders 
                data.push({uid: key, id: key1, ...res[key][key1]});
              }
            }
          }
        }
      }
      return data;
    })).subscribe((res: any)=>{
      if(res.length > 0){
        this.orders = res;
        console.log(this.orders);
        this.calculateDashboardBasicDetails(this.orders);
      }
    });
  }

  getDishes(): void{
    this.getDishSubscription = this.adminService.getDishes().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    },take(1))).subscribe(((res: any)=>{
      this.dishes = res;
      console.log(this.dishes);
      this.itemAnalysisData = this.utilityService.calculateItemAnalysis(this.dishes, this.orders);
      console.log(this.itemAnalysisData);
      this.itemAnalysisData.forEach(each=>{
        if(each.origin == 'Veg'){
          this.itemAnalysisVegData.push(each);
        }
        else{
          this.itemAnalysisNonVegData.push(each);
        }
      });
      this.itemAnalysisVegData.sort((a,b)=> b.quantity - a.quantity);
      this.itemAnalysisNonVegData.sort((a,b)=> b.quantity - a.quantity);
      this.itemAnalysisData.sort((a,b)=>{
        return a.quantity - b.quantity;
      });
      this.createItemChartData();
      this.itemAnalysisAvailable = true;
    }))
  }

  createItemChartData(){
    let cLabels = [];
    let cData = [];
    for(let x of this.itemAnalysisData){
      let name = x['name'];
      cLabels.push(name);
      cData.push(x['quantity']);
    }
    this.data.labels = cLabels;
    this.data.datasets[0].data = cData;
    this.data.datasets[0].backgroundColor = this.chartBackGroudColor;
    this.canvas = this.itemChart.nativeElement.getContext('2d');
    new Chart(this.canvas, {
      type: StaticMsg.calorie_chart_type,
      data: this.data
    });
  }

  calculateDashboardBasicDetails(data: any): void{
    this.ordersCount = this.utilityService.calculateDashboardBasicDetails(data);
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    console.log('leaving from admin dashboard');
    this.getOrderSubscription?.unsubscribe();
    this.getDishSubscription?.unsubscribe();
  }

}
