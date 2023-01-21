import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    baseUrl = environment.firbaseAPI;

    constructor(private http: HttpClient) {}

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ SLIDES API ##############################*/

    /* add slides to firebase database */
    addSlides(slides: {imageSource: string, altText: string, imageText: string}): Observable<any>{
        return this.http.post(`${this.baseUrl}/slides.json`,slides);
    }

    /* get slides from firebase database */
    getSlides(): Observable<any>{
        return this.http.get(`${this.baseUrl}/slides.json`);
    }

    /* update slides on firebase database */
    /* use PUT request */
    updateSlides(id: string, slides: {imageSource: string, altText: string, imageText: string}): Observable<any>{
        return this.http.put(`${this.baseUrl}/slides/${id}.json`,slides);
    }

    /* delete slides on firebase database */
    /* use DELETE request */
    deleteSlide(id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/slides/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ BRANCHES API ##############################*/

    /* add branches to firebase database */
    addBranches(branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.post(`${this.baseUrl}/shopLocation.json`,branches);
    }

    /* get branches from firebase database */
    getBranches(): Observable<any>{
        return this.http.get(`${this.baseUrl}/shopLocation.json`);
    }

    /* update slides on firebase database */
    /* use PUT request */
    updateBranches(id: string, branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.put(`${this.baseUrl}/shopLocation/${id}.json`,branches);
    }

    /* delete slides on firebase database */
    /* use DELETE request */
    deleteBranch(id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/shopLocation/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ DISH API ##############################*/

    /* add dishes to firebase database */
    addDishes(dishes: any): Observable<any>{
        return this.http.post(`${this.baseUrl}/dishes.json`,dishes);
    }

    /* get dishes from firebase database */
    getDishes(): Observable<any>{
        return this.http.get(`${this.baseUrl}/dishes.json`);
    }

    /* update dishes on firebase database */
    /* use PUT request */
    updateDishes(id: string, dishes: any): Observable<any>{
        return this.http.put(`${this.baseUrl}/dishes/${id}.json`,dishes);
    }

    /* delete dishes on firebase database */
    /* use DELETE request */
    deleteDish(id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/dishes/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ COUPONS API ##############################*/

    /* add coupons to firebase database */
    addCoupons(coupons: {couponCode: string, couponDescription: string, couponDiscountMethod: string, couponDiscount: number}): Observable<any>{
        return this.http.post(`${this.baseUrl}/coupons.json`,coupons);
    }

    /* get coupons from firebase database */
    getCoupons(): Observable<any>{
        return this.http.get(`${this.baseUrl}/coupons.json`);
    }

    /* update coupons on firebase database */
    /* use PUT request */
    updateCoupons(id: string, coupons: {couponCode: string, couponDescription: string, couponDiscountMethod: string, couponDiscount: number}): Observable<any>{
        return this.http.put(`${this.baseUrl}/coupons/${id}.json`,coupons);
    }

    /* delete coupons on firebase database */
    /* use DELETE request */
    deleteCoupon(id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/coupons/${id}.json`);
    }

    /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ OFFERS API ##############################*/

    /* add coupons to firebase database */
    addOffers(offer: {offerCode: string, minimumOrderValue: number, offerSection: string, offeredBy: string,
        discount: number, offerSubSection?: Array<any>}): Observable<any>{
        return this.http.post(`${this.baseUrl}/offer.json`,offer);
    }

    /* get coupons from firebase database */
    getOffers(): Observable<any>{
        return this.http.get(`${this.baseUrl}/offer.json`);
    }

    /* update coupons on firebase database */
    /* use PUT request */
    updateOffers(id: string, offer: {offerCode: string, minimumOrderValue: number, offerSection: string, offeredBy: string, discount: number, offerSubSection?: Array<any>}): Observable<any>{
        return this.http.put(`${this.baseUrl}/offer/${id}.json`,offer);
    }

    /* delete coupons on firebase database */
    /* use DELETE request */
    deleteOffer(id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/offer/${id}.json`);
    }
}