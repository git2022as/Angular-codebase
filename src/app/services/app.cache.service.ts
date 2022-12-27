import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppCacheService {
    loggedInUser: boolean = false;
    tokenSID: string = "";
    dishesDetails: Array<any> = [];
    offersDetails: Array<any> = [];
    carosulDetails: Array<any> = [];
    aboutUSDetails: any;
    cartDetails: Array<any> = [];
    profileDetails: any;
    
    /* setter & getter concept */

    set _loggedInUser(ln: boolean){
        this.loggedInUser = ln;
    }
    get _loggedInUser(): boolean{
        return this.loggedInUser;
    }

    set _tokenSID(token: string){
        this.tokenSID = token;
    }
    get _tokenSID(): string{
        return this.tokenSID;
    }

    set _dishesDetails(dish: Array<any>){
        this.dishesDetails = dish;
    }
    get _dishesDetails(): Array<any>{
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

}