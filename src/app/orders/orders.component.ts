import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orderSubscription: Subscription | undefined;
  orders: any[];
  orderAvailable: boolean = false;
  productDetails: any;
  constructor(public appCacheService: AppCacheService,
              private commonService: CommonService) {}

  ngOnInit(): void {
    this.productDetails = this.appCacheService._dishesDetails;
    this.getOrder();
  }

  getOrder(): void{
    const uid = this.appCacheService._UID;
    this.orderSubscription = this.commonService.getOrders(uid).pipe(map(res=>{
      let data = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            data.push({id: key, ...res[key]});
          }
        }
      }
      return data;
    })).subscribe((res: any)=>{
      if(res.length > 0){
        console.log(res);
        this.orders = res;
        this.orders = this.orders.reverse();
        this.orderAvailable = true;
      }
      else{
        this.orders = res;
        this.orderAvailable = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
  }

}
