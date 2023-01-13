import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private http: HttpClient) {}

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ SLIDES API ##############################*/

    /* add slides to firebase database */
    addSlides(slides: {imageSource: string, altText: string, imageText: string}): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/slides.json',slides);
    }

    /* get slides from firebase database */
    getSlides(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/slides.json');
    }

    /* update slides on firebase database */
    /* use PUT request */
    updateSlides(id: string, slides: {imageSource: string, altText: string, imageText: string}): Observable<any>{
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/slides/${id}.json`,slides);
    }

    /* delete slides on firebase database */
    /* use DELETE request */
    deleteSlide(id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/slides/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ BRANCHES API ##############################*/

    /* add branches to firebase database */
    addBranches(branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json',branches);
    }

    /* get branches from firebase database */
    getBranches(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json');
    }

    /* update slides on firebase database */
    /* use PUT request */
    updateBranches(id: string, branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation/${id}.json`,branches);
    }

    /* delete slides on firebase database */
    /* use DELETE request */
    deleteBranch(id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ DISH API ##############################*/

    /* add dishes to firebase database */
    addDishes(dishes: any): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes.json',dishes);
    }

    /* get dishes from firebase database */
    getDishes(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes.json');
    }

    /* update dishes on firebase database */
    /* use PUT request */
    updateDishes(id: string, dishes: any): Observable<any>{
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes/${id}.json`,dishes);
    }

    /* delete dishes on firebase database */
    /* use DELETE request */
    deleteDish(id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ COUPONS API ##############################*/

    /* add coupons to firebase database */
    addCoupons(coupons: {couponCode: string, couponDescription: string, couponDiscountMethod: string, couponDiscount: number}): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/coupons.json',coupons);
    }

    /* get coupons from firebase database */
    getCoupons(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/coupons.json');
    }

    /* update coupons on firebase database */
    /* use PUT request */
    updateCoupons(id: string, coupons: {couponCode: string, couponDescription: string, couponDiscountMethod: string, couponDiscount: number}): Observable<any>{
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/coupons/${id}.json`,coupons);
    }

    /* delete coupons on firebase database */
    /* use DELETE request */
    deleteCoupon(id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/coupons/${id}.json`);
    }
}