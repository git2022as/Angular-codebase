import { Injectable } from "@angular/core";
import { staticValue } from "../model/model";
import { coupon } from "../model/model";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
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
}