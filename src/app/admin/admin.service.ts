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

    /* add branches to firebase database */
    addBranches(branches: {branchLocation: string, locationImage: string, locationContact: number, locatiomTiming: string, branchPin: number}): Observable<any>{
        return this.http.post('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json',branches);
    }

    /* get branches from firebase database */
    getBranches(): Observable<any>{
        return this.http.get('https://kebab-house-db7f1-default-rtdb.firebaseio.com/shopLocation.json');
    }
}