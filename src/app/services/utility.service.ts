import { Injectable } from "@angular/core";
import { staticValue } from "../constants/constant";
import { couponInterface } from "../interface/project.interface";
import { AppCacheService } from "./app.cache.service";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    constructor(private appCacheService: AppCacheService){}
    cartObject = {
        totalCartValue: 0,
        deliveryFree: false,
        deliveryAmount: 0,
        govtTaxPackage: 0,
        appDiscountAmount: 0,
        finalPay: 0
    };

    /* calculate value from UI $$$$$$$$$$$ */
    //1. - check cart
    calculateCartValue(arr: any, selectedCoupon?: string): {totalCartValue: number, deliveryFree: boolean, deliveryAmount: number, govtTaxPackage: number, appDiscountAmount: number, finalPay: number}{
        this.cartObject['totalCartValue'] = this.totalCartValue(arr);
        let totalDiscount: number = 0;
        if(this.cartObject['totalCartValue'] > 500){
            this.cartObject['deliveryFree'] = true;
            this.cartObject['deliveryAmount'] = 0;
        }
        else{
            this.cartObject['deliveryFree'] = false;
            this.cartObject['deliveryAmount'] = staticValue.deliveryCharge;
        }
        this.calculateGovtTaxPackage(this.cartObject['totalCartValue']);
        if(selectedCoupon){
            totalDiscount = this.calculateAppDiscount(selectedCoupon, this.cartObject['totalCartValue']);
        }
        this.cartObject['appDiscountAmount'] = totalDiscount;
        const finalPay = ((this.cartObject['totalCartValue'] + this.cartObject['govtTaxPackage'] + this.cartObject['deliveryAmount'])-this.cartObject['appDiscountAmount']);
        this.cartObject['finalPay'] = finalPay;
        return this.cartObject;
    }

    //2. - calculate total cart value
    totalCartValue(arr: Array<any>): number {
        let total : number = 0;
        arr.forEach(each =>{
            total = each.tprice ? (each.tprice + total) : total;
        });
        return total;
    }

    //3. - calculate govt tax + packaging charge
    calculateGovtTaxPackage(cartValue: number){
        const tax = Number(((cartValue*staticValue.gstPercent)/100).toFixed(2));
        this.cartObject['govtTaxPackage'] = tax +  staticValue.packagingCharge;
    }

    //4. - to calculate discount amount
    calculateAppDiscount(selectedCoupon: string, totalCartValue: number) {
        let totalDiscount : number = 0;
        let coupon: couponInterface;
        const coupons = this.appCacheService._couponDetails;
        if(coupons){
            coupons.forEach(each=>{
                if(each.couponCode == selectedCoupon){
                    coupon = each;
                }
            });
        }
        if(coupon.couponDiscountMethod == 'percentage'){
            totalDiscount = Number(((totalCartValue*coupon.couponDiscount)/100).toFixed(2));
        }
        else{
            totalDiscount =  coupon.couponDiscount;
        }
        return totalDiscount;
    }

    //5. to calculate available offers in the payment page (banks/wallets) */
    calculateAvailableOffers(cartValue: number): number{
        const offers = this.appCacheService._offersDetails;
        let count = 0;
        if(offers && offers.length > 0){
            offers.forEach(each=>{
                if(cartValue > each.minimumOrderValue){
                    count++;
                }
            })
        }
        return count;
    }

    //6. calculate offer applied & return final cart value => payment page
    calculateFinalCartAfterOffer(currentFinalValue: number,offer: any){
        return offer ? (currentFinalValue-Number(offer.discount)) : currentFinalValue;
    }

    /* calculate value from UI ends here */

    checkDishInCart(product: any): boolean{
        let val: boolean = true;
        if(this.appCacheService._cartDetails.length == 0)
          val = true;
        else{
          this.appCacheService._cartDetails.forEach(each => {
            if(each.id == product.id){
              val = false;
            }
          })
        }
        return val;
    }

    checkOverallRating(data: Array<any>): number{
        let overallRating;
        let totalRating = 0;
        let length = data.length;
        if(length > 0){
            data.forEach(each=>{
                if(each.rating){
                    totalRating = totalRating + Number(each.rating);
                }  
            });
        }
        overallRating = (totalRating/length).toFixed(2);
        return Number(overallRating);
    }

    checkWholeRating(val: any): Array<number>{
        let num = [];
        let x = Number(val);
        let a = x % 1;
        let b = (x-a);
        if(b>1){
            for(let i = 1; i<=b; i++){
                num.push(i);
            }
        }
        return num;
    }

    checkFractionalRating(val: any): number{
        let x = Number(val);
        let a = val % 1;
        return a;
    }

    calculateCurrentTime(): string{
        const date = new Date();
        const dateString = date.toDateString();
        const timeString = date.toTimeString();
        const GPos = timeString.indexOf('G');
        const newTimeString = timeString.substring(0, (GPos-1));
        const latestTime = `${dateString} ${newTimeString}`;
        return latestTime;
    }
}