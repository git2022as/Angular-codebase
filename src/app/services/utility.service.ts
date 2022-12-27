import { Injectable } from "@angular/core";

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
}