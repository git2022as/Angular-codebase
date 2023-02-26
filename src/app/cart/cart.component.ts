import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { ShortMessageComponent } from '../shared/short-message/short-message.component';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';
import { AppCacheService } from '../services/app.cache.service';
import { staticValue } from '../constants/constant';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { finalPaymentInterface } from '../interface/project.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  cartAvailable: boolean = false;
  timeForMsg: number = staticValue.timeForMsg;
  deliveryAmount: number = staticValue.deliveryCharge;
  cartObj : any;
  totalCartValue: number;
  deliveryFree: boolean = false;
  govtTaxPackage: number = staticValue.govtTaxPackage;
  packagingCharge: number = staticValue.packagingCharge;
  productDetails: Array<any> = [];
  cartDetails : Array<any> = [];
  selectedCoupon: string = "";
  coupons: Array<any>;
  appDiscountAmount: number = staticValue.appDiscountAmount;
  showAppDiscount: boolean = false;
  showAppDiscountTooltip : string = "";
  manualCouponCode: string = "";
  couponError: boolean = false;
  couponErroMsg: string = "";
  couponSubscription: Subscription | undefined;
  constructor(private dataService: DataService,
              private utilityService: UtilityService,
              public appCacheService: AppCacheService,
              private router: Router,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.checkCart();
    this.getCoupons();
  }

  getCoupons(): void{
    this.couponSubscription = this.adminService.getCoupons().pipe(map((res:any)=>{
      let coupon = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            coupon.push({id: key, ...res[key]});
          }
        }
      }
      return coupon;
    })).subscribe((res)=>{
      this.coupons = res;
      this.appCacheService._couponDetails = this.coupons;
    })
  }

  checkCart(){
    this.cartDetails = this.appCacheService._cartDetails;
    this.productDetails = this.appCacheService._dishesDetails;
    this.selectedCoupon = this.appCacheService._appliedCoupon;
    if(this.selectedCoupon != ""){
      this.showAppDiscount = true;
      this.showAppDiscountTooltip = `${this.selectedCoupon} is applied`;
    }
    if(this.cartDetails.length > 0){
      this.cartAvailable = true;
      this.cartObj = this.utilityService.calculateCartValue(this.cartDetails,this.selectedCoupon); 
    }
    else
      this.cartAvailable = false;
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
    this.appCacheService._appliedCoupon = this.selectedCoupon = event;
    this.cartObj = this.utilityService.calculateCartValue(this.cartDetails,this.selectedCoupon); 
    if(this.cartObj.appDiscountAmount > 0){
      this.showAppDiscount = true;
      this.showAppDiscountTooltip = `${this.selectedCoupon} is applied`;
    }
  }

  goToPayment(): void{
    //sending QUERY PARAMS to the route
    this.router.navigate(['layout/payment/'],{queryParams: {selectedCoupon: JSON.stringify(this.selectedCoupon)}});
  }

  _cartTotalEvent(event): void{
    if(event.cartUpdated){
      this.checkCart();
    }
  }

  ngOnDestroy(): void {
    this.couponSubscription?.unsubscribe();
  }

}
