import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    baseUrl = environment.firbaseAPI;

    constructor(private http: HttpClient) {}

    getSlides(): Observable<any>{
        return this.http.get(`${this.baseUrl}/slides.json`);
    }

    getDish(): Observable<any>{
        return this.http.get(`${this.baseUrl}/dishes.json`);
    }

    getBranches(): Observable<any>{
        return this.http.get(`${this.baseUrl}/shopLocation.json`);
    }

    getOffers(): Observable<any>{
        return this.http.get(`${this.baseUrl}/offer.json`);
    }

}