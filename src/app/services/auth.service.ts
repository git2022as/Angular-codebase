import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { firebaseAPI } from '../constants/constant';
import { Observable } from 'rxjs';
import { signUpResponseInterface, signInResponseInterface, signInRequestInterface, signUpRequestInterface } from '../interface/project.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = environment.firbaseAPI;

    constructor(private angularFireAuth: AngularFireAuth,
                private http: HttpClient) {}

    //login scenario
    getLogin(value: signInRequestInterface): Observable<signInResponseInterface>{
        const userReqObj = {email: value.emailAddress, password: value.password, returnSecureToken: true};
        const url = `${firebaseAPI.signInUrl}${firebaseAPI.APIKey}`;
        return this.http.post<signInResponseInterface>(url, userReqObj);
        //return this.angularFireAuth.signInWithEmailAndPassword(email,password);
    }

    //signup scenario
    createUser(value: signUpRequestInterface): Observable<signUpResponseInterface>{
        const userReqObj = {email: value.email, password: value.password, returnSecureToken: true};
        const url = `${firebaseAPI.signUpUrl}${firebaseAPI.APIKey}`
        return this.http.post<signUpResponseInterface>(url, userReqObj);
        //return this.angularFireAuth.createUserWithEmailAndPassword(email,password);
    }

    //logout scenario
    logoutUser(): Promise<any>{
        return this.angularFireAuth.signOut();
    }

    //forgot password scenario
    forgotPassword(value: {forgotEmailAdd: string}): Observable<any>{
        const email = value.forgotEmailAdd;
        const requestType = "PASSWORD_RESET";
        const data = {
            requestType: requestType,
            email: email
        }
        const url = `${firebaseAPI.resetPassLinkUrl}${firebaseAPI.APIKey}`;
        return this.http.post(url,data);
        //return this.angularFireAuth.sendPasswordResetEmail(email);
    }

    //cart scenario
    /* get cart from firebase database for logged-in user */
    getFromCart(uid: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/cart/${uid}.json`);
    }

    /* add dish to cart in firebase database */
    /* here id is the DISH ID */
    addToCart(uid: string, cart: {quantity: number, addOn: Array<any>, tprice: number, id: string}): Observable<any>{
        return this.http.post(`${this.baseUrl}/cart/${uid}.json`,cart);
    }

    /* delete dish from cart on firebase database */
    /* use DELETE request */
    deleteDishFromCart(uid: string, id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/cart/${uid}/${id}.json`);
    }

    /* update dish from cart on firebase database */
    /* use PUT request */
    updateDishOnCart(uid: string, id: string, cart: {quantity: number, addOn: Array<any>, tprice: number, id: string}): Observable<any>{
        return this.http.put(`${this.baseUrl}/cart/${uid}/${id}.json`,cart);
    }

}