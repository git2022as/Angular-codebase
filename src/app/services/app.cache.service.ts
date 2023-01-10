import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppCacheService {
    loggedInUser: boolean = false;
    UID: string = "";
    refreshToken: string = "";
    loggedInUserName: string = "";
    loggedInUserEmail: string = "";
    dishesDetails: Array<any> = [];
    offersDetails: Array<any> = [];
    carosulDetails: Array<any> = [];
    aboutUSDetails: any;
    cartDetails: Array<any> = [];
    profileDetails: any;
    adminLoggedIn: boolean = false;
    
    /* setter & getter concept */

    set _loggedInUser(ln: boolean){
        this.loggedInUser = ln;
    }
    get _loggedInUser(): boolean{
        return this.loggedInUser;
    }

    set _refreshToken(token: string){
        this.refreshToken = token;
    }
    get _refreshToken(): string{
        return this.refreshToken;
    }

    set _loggedInUserName(name: string){
        this.loggedInUserName = name;
    }
    get _loggedInUserName(): string{
        return this.loggedInUserName;
    }

    set _loggedInUserEmail(email: string){
        this.loggedInUserEmail = email;
    }
    get _loggedInUserEmail(): string{
        return this.loggedInUserEmail;
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

    set _UID(uid: string){
        this.UID = uid;
    }

    get _UID(): string{
        return this.UID;
    }

}