import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { firebaseAPI } from '../constants/constant';
import { Observable } from 'rxjs';
import { signUpResponse, signInResponse } from '../interface/project.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private angularFireAuth: AngularFireAuth,
                private http: HttpClient) {}

    //login scenario
    getLogin(value: any): Observable<any>{
        const userReqObj = {email: value.emailAddress, password: value.password, returnSecureToken: true};
        const url = `${firebaseAPI.signInUrl}${firebaseAPI.APIKey}`;
        return this.http.post<signInResponse>(url, userReqObj);
        //return this.angularFireAuth.signInWithEmailAndPassword(email,password);
    }

    //signup scenario
    createUser(value: any): Observable<any>{
        const userReqObj = {email: value.email, password: value.password, returnSecureToken: true};
        const url = `${firebaseAPI.signUpUrl}${firebaseAPI.APIKey}`
        return this.http.post<signUpResponse>(url, userReqObj);
        //return this.angularFireAuth.createUserWithEmailAndPassword(email,password);
    }

    //logout scenario
    logoutUser(): Promise<any>{
        return this.angularFireAuth.signOut();
    }

    //forgot password scenario
    forgotPassword(value: {forgotEmailAdd: string}): Promise<any>{
        const email = value.forgotEmailAdd;
        return this.angularFireAuth.sendPasswordResetEmail(email);
    }

    //cart scenario
    /* get cart from firebase database for logged-in user */
    getFromCart(uid: string): Observable<any>{
        return this.http.get(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/cart/${uid}.json`);
    }

    /* add dish to cart in firebase database */
    /* here id is the DISH ID */
    addToCart(uid: string, cart: {quantity: number, addOn: Array<any>, tprice: number, id: string}): Observable<any>{
        return this.http.post(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/cart/${uid}.json`,cart);
    }

    /* delete dish from cart on firebase database */
    /* use DELETE request */
    deleteDishFromCart(uid: string, id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/cart/${uid}/${id}.json`);
    }

    /* update dish from cart on firebase database */
    /* use PUT request */
    updateDishOnCart(uid: string, id: string, cart: {quantity: number, addOn: Array<any>, tprice: number, id: string}): Observable<any>{
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com/cart/${uid}/${id}.json`,cart);
    }

}