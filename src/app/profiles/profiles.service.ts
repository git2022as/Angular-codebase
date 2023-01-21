import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.firbaseAPI;
    //profile scenario
    /* get profile details from firebase database for logged-in user */
    getProfile(uid: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/profile/${uid}.json`);
    }

    /* add profile in firebase database */
    addProfile(uid: string, profile: {name: string, phoneNumber: number, deliveryAddress: {city: string, pincode: number, state: string, street: string}, secondDeliveryAddress: [{city: string, pincode: number, state: string, street: string}]}): Observable<any>{
        return this.http.post(`${this.baseUrl}/profile/${uid}.json`,profile);
    }

    /* delete profile from firebase database */
    /* use DELETE request */
    deleteProfileAddress(uid: string, id: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/cart/${uid}/${id}.json`);
    }

    /* update profile from firebase database */
    /* use PUT request */
    updateProfile(uid: string, id: string, profile: any): Observable<any>{
        return this.http.put(`${this.baseUrl}/cart/${uid}/${id}.json`,profile);
    }
}