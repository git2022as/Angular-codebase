import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ShortMessageComponent } from '../shared/short-message/short-message.component';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';
import { AppCacheService } from '../services/app.cache.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  timeForMsg: number = 2000;
  totalCartValue: number;
  deliveryLogic: string = "FREE";
  govtTax: number = 50;
  packagingCharge: number = 50;
  toPayValue: number = 100;
  productDetails: Array<any> = [];
  cartDetails : Array<any> = [];
  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.checkCart();
    this.subscribeDataService();
  }

  checkCart(){
    this.cartDetails = this.appCacheService._cartDetails;
    this.productDetails = this.appCacheService._dishesDetails;
    this.calculateCartValue(this.cartDetails);
  }

  calculateCartValue(arr: Array<any>): void{
    this.totalCartValue = this.utilityService.calculateCartValue(arr);
  }

  subscribeDataService(): void{
    this.dataService.UPDATED_CART.subscribe((res: any)=>{
      this.totalCartValue = this.utilityService.calculateCartValue(res);
    });
  }

  showShortMsg(event: any): void{
    const componentRef = this.shortContainer.createComponent(ShortMessageComponent);
    componentRef.instance.message = event.message;
    componentRef.instance.time = this.timeForMsg;
    componentRef.instance.parent = this.getParent();
  }

  getParent(): any{
    return {
      callParentMethod: () => {
        this.removeShortMsg();
      }
    }
  }

  removeShortMsg(): void{
    this.shortContainer.clear();
  }

}
