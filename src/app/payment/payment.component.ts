import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { UtilityService } from '../services/utility.service';
import { errorMessages } from '../constants/constant';
import { CommonService } from '../services/common.service';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

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
  upiValue: string = "";
  errorMessages = errorMessages;
  cardValue: number = null;
  cardExpiryValue: number = null;
  cardCvvValue: number = null;

  @ViewChild('upiForm', {static: true}) upiForm: any;

  constructor(private activatedRoute: ActivatedRoute,
              private appCacheService: AppCacheService,
              private utilityService: UtilityService,
              public commonService: CommonService) { }

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

  confirmPayment(sec: string): void{
    console.log('payment confirmed ' + sec);
  }

}
