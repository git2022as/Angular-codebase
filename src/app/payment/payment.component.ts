import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  showBreakUp: boolean = false;
  cartObj: any;
  paymentPageReady: boolean = false;
  discountTooltip: string = "";
  cartDetails: any;
  appliedCoupon: any;
  paymentMode: string = 'card';

  constructor(private activatedRoute: ActivatedRoute,
              private appCacheService: AppCacheService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.routeSubscribe();
    this.calculatePayment();
  }

  routeSubscribe(): void{
    /*this.activatedRoute.queryParamMap.subscribe(x=>{
      this.appliedCoupon = x.get('selectedCoupon');
      console.log(this.appliedCoupon);
    });*/
    //another way to get query param value
    //get the value single time during payment page load
    this.appliedCoupon = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('selectedCoupon'));
  }

  calculatePayment(): void{
    this.cartDetails = this.appCacheService._cartDetails;
    if(this.appliedCoupon)
      this.cartObj = this.utilityService.calculateCartValue(this.cartDetails, this.appliedCoupon);
    else
      this.cartObj = this.utilityService.calculateCartValue(this.cartDetails);
    if(this.cartObj.appDiscountAmount > 0){
      this.discountTooltip = `${this.appliedCoupon.couponCode} is applied`;
    }
  }

}
