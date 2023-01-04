import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ShortMessageComponent } from '../shared/short-message/short-message.component';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';
import { AppCacheService } from '../services/app.cache.service';
import { staticValue, coupon } from '../constants/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  cartAvailable: boolean = false;
  timeForMsg: number = 2000;
  deliveryAmount: number = staticValue.deliveryCharge;
  totalCartValue: number;
  deliveryFree: boolean = false;
  govtTaxPackage: number = 0;
  packagingCharge: number = staticValue.packagingCharge;
  productDetails: Array<any> = [];
  cartDetails : Array<any> = [];
  selectedCoupon: string;
  coupon = coupon;
  appDiscountAmount: number = 0;
  showAppDiscount: boolean = false;
  showAppDiscountTooltip : string = "";
  manualCouponCode: string = "";
  couponError: boolean = false;
  couponErroMsg: string = "";
  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              private appCacheService: AppCacheService,
              private router: Router) { }

  ngOnInit(): void {
    this.checkCart();
    this.subscribeDataService();
  }

  checkCart(){
    this.cartDetails = this.appCacheService._cartDetails;
    this.productDetails = this.appCacheService._dishesDetails;
    if(this.cartDetails.length > 0){
      this.cartAvailable = true;
      this.calculateCartValue(this.cartDetails);
    }
    else
      this.cartAvailable = false;
  }

  calculateCartValue(arr: Array<any>): void{
    this.totalCartValue = this.utilityService.calculateCartValue(arr);
    if(this.totalCartValue > 500){
      this.deliveryFree = true;
      this.deliveryAmount = 0
    }else{
      this.deliveryAmount = staticValue.deliveryCharge;
      this.deliveryFree = false;
    }
    this.calculateGovtTaxPackage();
  }

  subscribeDataService(): void{
    this.dataService.UPDATED_CART.subscribe((res: any)=>{
     this.checkCart();
    });
  }

  calculateGovtTaxPackage(){
    let tax = 0;
    tax = this.utilityService.calculateGovtTax(this.totalCartValue);
    this.govtTaxPackage = tax +  staticValue.packagingCharge;
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

  applySiteCoupon(event: any): void{
    this.appDiscountAmount = this.utilityService.calculateAppDiscount(event.value,this.totalCartValue);
    if(this.appDiscountAmount > 0){
      this.showAppDiscount = true;
      this.showAppDiscountTooltip = `${event.value} is applied`;
    }
  }

  goToPayment(): void{
    this.router.navigateByUrl('payment');
  }

  applyCoupon(): void{
    //API call to check coupon validity
    if(this.manualCouponCode == ""){
      this.couponError = true;
      this.couponErroMsg = "Please enter coupon code";
    }
    else{
      //CALL API with value this.manualCouponCode
      //write code to validate coupon amount
      this.couponError = true;
      this.couponErroMsg = "Invalid coupon code";
    }
  }

}
