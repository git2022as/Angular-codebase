import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppCacheService } from "../services/app.cache.service";
import { tokenUrL } from "../constants/constant";

@Injectable({
    providedIn: 'root'
})

export class HttpRequestInterceptor implements HttpInterceptor{

    constructor(private appCacheService: AppCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //get token id which we get after login
        //for testing only
        const API_KEY = this.appCacheService._token? this.appCacheService._token : ""; 
        const TEST_KEY = "Test";
        let urlPresentCount = false;
        let newReq;

        tokenUrL.noToken.forEach(element => {
            if(req.url.includes(element)){
                urlPresentCount = true;
            }
        });

        if(urlPresentCount){
            newReq = req.clone({
                setHeaders: {
                    testKey: TEST_KEY
                }
            });
            return next.handle(newReq);
        }
        else{
            return next.handle(req);
        }

        //another way of modifying headers
        /*newReq = newReq.clone({
            headers: newReq.headers.append('auth','test')
        })*/

        /* TESTING ENDS HERE */

    }
    
}