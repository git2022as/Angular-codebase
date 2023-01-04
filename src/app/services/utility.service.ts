import { Injectable } from "@angular/core";
import { staticValue } from "../model/model";
import { coupon } from "../model/model";
import { AppCacheService } from "./app.cache.service";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    constructor(private appCacheService: AppCacheService){}

    calculateAppDiscount(value: any, totalCartValue: number) {
        let totalDiscount : number = 0;
        let appDiscountDetails = this.findAppDiscountDetails(value);
        if(appDiscountDetails.discountPercent){
            totalDiscount = Number(((totalCartValue*appDiscountDetails.discountAmout)/100).toFixed(2));
        }
        else{
            totalDiscount =  appDiscountDetails.discountAmout;
        }
        return totalDiscount;
    }

    findAppDiscountDetails(value: any): any {
        let a = {};
        if(coupon && Array.isArray(coupon)){
            coupon.forEach(each => {
                if(value == each.code){
                    a = {discountPercent: each.discountPercent, discountAmout: each.discountAmout};
                }
            });
            return a;
        }
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
        let val: boolean;
        if(this.appCacheService._cartDetails.length == 0)
          val = true;
        else{
          this.appCacheService._cartDetails.forEach(each => {
            if(each.itemId == product.itemId){
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