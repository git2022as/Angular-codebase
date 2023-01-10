import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private http: HttpClient) {}

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
        return this.http.put(`https://kebab-house-db7f1-default-rtdb.firebaseio.com//slides/${id}.json`,slides);
    }

    /* delete slides on firebase database */
    /* use DELETE request */
    deleteSlide(id: string): Observable<any>{
        return this.http.delete(`https://kebab-house-db7f1-default-rtdb.firebaseio.com//slides/${id}.json`);
    }

    /* add branches to firebase database */
    addBranches(branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json',branches);
    }

    /* get branches from firebase database */
    getBranches(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json');
    }

    /* add dishes to firebase database */
    addDishes(dishes: any): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes.json',dishes);
    }

    /* get dishes from firebase database */
    getDishes(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/dishes.json');
    }
}