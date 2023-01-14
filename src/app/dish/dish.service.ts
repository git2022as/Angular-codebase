import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppCacheService } from "../services/app.cache.service";

@Injectable({
    providedIn: 'root'
})

export class DishService {

    constructor(private http: HttpClient, private appCacheService: AppCacheService){}

    /*getReviews(id: string): Observable<any>{
        return this.http.get();
    }*/

}