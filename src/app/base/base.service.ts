import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BaseService {

    constructor(private http: HttpClient) {}

    getSlides(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/slides.json');
    }

    getDish(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes.json');
    }

    getBranches(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json');
    }

    getOffers(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/offers.json');
    }

}