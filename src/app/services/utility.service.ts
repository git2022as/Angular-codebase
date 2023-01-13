import { Injectable } from "@angular/core";
import { staticValue } from "../constants/constant";
import { AppCacheService } from "./app.cache.service";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    constructor(private appCacheService: AppCacheService){}

    calculateAppDiscount(value: any, totalCartValue: number, coupon: any) {
        let totalDiscount : number = 0;
        let appDiscountDetails = this.findAppDiscountDetails(value, coupon);
        if(appDiscountDetails.couponDiscountMethod == 'percentage'){
            totalDiscount = Number(((totalCartValue*appDiscountDetails.couponDiscount)/100).toFixed(2));
        }
        else{
            totalDiscount =  appDiscountDetails.couponDiscount;
        }
        return totalDiscount;
    }

    findAppDiscountDetails(value: any, coupon): any {
        let a = {};
        if(coupon && Array.isArray(coupon)){
            coupon.forEach(each => {
                if(value == each.couponCode){
                    a = {couponDiscountMethod: each.couponDiscountMethod, couponDiscount: each.couponDiscount};
                }
            });
        }
        return a;
    }

    calculateCartValue(arr: Array<any>): number {
        let total = 0;
        arr.forEach(each =>{
            total = each.tprice ? (each.tprice + total) : total;
        });
        return total;
    }

    calculateGovtTax(cartValue: number): number{
        let val;
        val = ((cartValue*staticValue.gstPercent)/100).toFixed(2);
        return Number(val);
    }

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
}