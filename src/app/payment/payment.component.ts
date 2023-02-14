import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { UtilityService } from '../services/utility.service';
import { errorMessages, staticValue } from '../constants/constant';
import { CommonService } from '../services/common.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalPaymentInterface } from '../interface/project.interface';
import { ProfileService } from '../profiles/profiles.service';
import { Subscription } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

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
  offersAvailableCount: number = staticValue.offersAvailableCount; 
  offerAppliedCode: string = "";
  offerDiscount: number = null;
  deliverAddressSubscription: Subscription | undefined;
  orderSubscription: Subscription | undefined;
  dAddressAvailable: boolean = false;
  dAddressDetails: any;
  selectedDeliverAddress: any;

  @ViewChild('upiForm', {static: true}) upiForm: any;
  @ViewChild('deliverAddressForm', {read: NgForm}) deliverAddressForm: any;

  constructor(private activatedRoute: ActivatedRoute,
              public appCacheService: AppCacheService,
              private utilityService: UtilityService,
              public commonService: CommonService,
              private router: Router,
              private profileService: ProfileService,
              private authService: AuthService,
              private dataService: DataService) { }

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
    this.getDeliveryAddrees();
  }

  getDeliveryAddrees(){
    const uid = this.appCacheService._UID;
    this.deliverAddressSubscription = this.profileService.getProfile(uid).pipe(map((res: any)=>{
      let dAddress = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            dAddress.push({...res[key], id: key});
          }
        }
      }
      return dAddress;
    })).subscribe((res: any)=>{
      if(res && res.length>0){
        this.dAddressAvailable = true;
        this.dAddressDetails = this.calculateAvailableDeliveryAddress(res[0]);
      }
      else{
        this.dAddressAvailable = false;
      }
    });
  }

  calculateAvailableDeliveryAddress(data: Array<any>): Array<any>{
    let final = [];
    final.push(data['deliveryAddress']);
    return  data.hasOwnProperty('secondDeliveryAddress') ? [...final, ...data['secondDeliveryAddress']] : [...final];
  }

  addressChange(event): void{
    console.log(event);
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
    console.log('cart object' + JSON.stringify(this.cartObj));
    console.log('payment confirmed ' + sec);
    console.log("delivery address" + JSON.stringify(this.selectedDeliverAddress));
    console.log("cart details " + JSON.stringify(this.appCacheService.cartDetails));
    let data = {};
    data['cartPrice'] = this.cartObj;
    data['paymentsection'] = sec;
    data['deliveryAddress'] = this.selectedDeliverAddress;
    data['cartDetails'] = this.cartDetails;
    data['orderStatus'] = 'ordered'; //total 3 status as => ordered, intrans, delivered
    data['orderTime'] = this.utilityService.calculateCurrentTime();
    data['deliveryTime'] = 'NA';
    this.orderItem(data);
  }

  orderItem(data: any): void{
    const uid = this.appCacheService._UID; 
    this.orderSubscription = this.commonService.addOrders(uid, data).pipe(
      map(res=>{return res ? res : catchError(res => 'Order is not successful')}),
      mergeMap(res => this.authService.clearCart(uid)),
      take(1)
    ).subscribe((res:any)=>{
      //when order is successful
      //clear cart & clear data from localstorage
      this.appCacheService._cartDetails = [];
      this.appCacheService.deleteCartFromLocalStorage();
      this.dataService.UPDATE_CART_COUNT.next(true);
      this.router.navigate(['layout/orders']);
    },
    (error: any)=>{
      //Handled Globally
    })
  }

  goToOfferPage(): void{
    if(this.offerAppliedCode != ''){
      this.appCacheService._appliedOffer = null;
      this.offerAppliedCode = "";
      this.calculatePayment();
    }
    else{
      this.appCacheService._cartValue = this.cartObj.finalPay;
      this.router.navigate(['layout/offers']);
    }
  }

  ngOnDestroy(): void {
    this.deliverAddressSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  addProfile(): void{
    this.router.navigate(['layout/profiles']);
  }

}
