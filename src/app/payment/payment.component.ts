import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { UtilityService } from '../services/utility.service';
import { errorMessages } from '../constants/constant';
import { CommonService } from '../services/common.service';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { finalPaymentInterface } from '../interface/project.interface';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  showBreakUp: boolean = false;
  cartObj: finalPaymentInterface;
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
  offerApplied: boolean = false;
  offersAvailableCount: number = 0; 
  offerAppliedCode: string = "";
  offerDiscount: number = null;

  @ViewChild('upiForm', {static: true}) upiForm: any;

  constructor(private activatedRoute: ActivatedRoute,
              private appCacheService: AppCacheService,
              private utilityService: UtilityService,
              public commonService: CommonService,
              private router: Router) { }

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
    //this.appliedCoupon = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('selectedCoupon'));
    this.appliedCoupon = this.appCacheService._appliedCoupon;
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
    this.offersAvailableCount = this.utilityService.calculateAvailableOffers(this.cartObj.finalPay);
    const offer = this.appCacheService._appliedOffer;
    if(offer){
      this.offerAppliedCode = offer?.offerCode;
      this.cartObj.finalPay = this.utilityService.calculateFinalCartAfterOffer(this.cartObj.finalPay,offer);
      this.offerDiscount = offer?.discount;
    }
  }

  confirmPayment(sec: string): void{
    console.log('payment confirmed ' + sec);
  }

  goToOfferPage(): void{
    if(this.offerAppliedCode != ''){
      this.appCacheService._appliedOffer = null;
      this.offerAppliedCode = "";
      this.calculatePayment();
    }
    else{
      this.appCacheService._cartValue = this.cartObj.finalPay;
      this.router.navigate(['/offers']);
    }
  }

}
