import { Injectable } from "@angular/core";
import { staticValue } from "../model/model";

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
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