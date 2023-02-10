import { Injectable } from "@angular/core";
import { couponInterface } from "../interface/project.interface";

@Injectable({
    providedIn: 'root'
})

export class AppCacheService {
    loggedInUser: boolean = false;
    UID: string = "";
    token: string = "";
    loggedInUserName: string = "";
    loggedInUserEmail: string = "";
    dishesDetails: Array<any> = [];
    offersDetails: Array<any> = [];
    couponDetails: Array<any> = [];
    carosulDetails: Array<any> = [];
    aboutUSDetails: any;
    cartDetails: Array<any> = [];
    profileDetails: any;
    adminLoggedIn: boolean = false;
    cartValue: number = null;
    appliedOffer: any;
    appliedCoupon: string;
    contentData: any;
    
    /* setter & getter concept */

    /*part of LOGIN*/
    set _loggedInUser(ln: boolean){
        this.loggedInUser = ln;
    }
    get _loggedInUser(): boolean{
        return this.loggedInUser;
    }

    set _token(token: string){
        this.token = token;
    }
    get _token(): string{
        return this.token;
    }

    set _loggedInUserEmail(email: string){
        this.loggedInUserEmail = email;
    }
    get _loggedInUserEmail(): string{
        return this.loggedInUserEmail;
    }

    set _UID(uid: string){
        this.UID = uid;
    }

    get _UID(): string{
        return this.UID;
    }
    /* end of LOGIN */

    set _loggedInUserName(name: string){
        this.loggedInUserName = name;
    }
    get _loggedInUserName(): string{
        return this.loggedInUserName;
    }

    set _dishesDetails(dish: any){
        this.dishesDetails = dish;
    }
    get _dishesDetails(): any{
        return this.dishesDetails;
    }

    set _offersDetails(offer: Array<any>){
        this.offersDetails = offer;
    }
    get _offersDetails(): Array<any>{
        return this.offersDetails;
    }

    set _carosulDetails(carosul: Array<any>){
        this.carosulDetails = carosul;
    }
    get _carosulDetails(): Array<any>{
        return this.carosulDetails;
    }

    set _aboutUSDetails(about: any){
        this.aboutUSDetails = about;
    }
    get _aboutUSDetails(): any{
        return this.aboutUSDetails;
    }

    set _cartDetails(cart: Array<any>){
        this.cartDetails = cart;
    }
    get _cartDetails(): Array<any>{
        return this.cartDetails;
    }

    set _profileDetails(profile: any){
        this.profileDetails = profile;
    }
    get _profileDetails(): any{
        return this.profileDetails;
    }

    set _adminLoggedIn(admin: boolean){
        this.adminLoggedIn = admin;
    }

    get _adminLoggedIn(): boolean{
        return this.adminLoggedIn;
    }

    set _cartValue(value: number){
        this.cartValue = value;
        localStorage.setItem('cartValue', JSON.stringify(this.cartValue));
    }

    get _cartValue(): number{
        return this.cartValue;
    }

    set _appliedOffer(value: any){
        this.appliedOffer = value;
        localStorage.setItem('appliedOffer', JSON.stringify(this.appliedOffer));
    }

    get _appliedOffer(): any{
        return this.appliedOffer;
    }

    set _appliedCoupon(value: string){
        this.appliedCoupon = value;
        localStorage.setItem('appliedCoupon', JSON.stringify(this.appliedCoupon));
    }

    get _appliedCoupon(): any{
        return this.appliedCoupon;
    }

    set _couponDetails(value: any){
        this.couponDetails = value;
        localStorage.setItem('couponDetails', JSON.stringify(this.couponDetails));
    }

    get _couponDetails(): any{
        return this.couponDetails;
    }

    /* cart add & delete to localstorage method */
    addCartToLocalStorage(): void{
        localStorage.setItem('cartData', JSON.stringify(this.cartDetails));
    }

    deleteCartFromLocalStorage(): void{
        localStorage.removeItem('cartData');
    }

    /*content data */
    set _content(value: any){
        this.contentData = value;
        localStorage.setItem('content', JSON.stringify(this.contentData));
    }

    get _content(): any{
        if(this.contentData){
            return this.contentData;
        }
        else{
            return JSON.parse(localStorage.getItem('content'));
        }
    }

}