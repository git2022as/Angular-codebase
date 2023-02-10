import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap, catchError, of, throwError, map } from "rxjs";
import { CommonService } from "../services/common.service";
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
})

export class HttpResponseInterceptor implements HttpInterceptor{

    constructor(private commonService: CommonService,
                private bsModalRef: BsModalRef) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.commonService.showSpinner();
        return next.handle(req).pipe(
            tap((event)=>{
                if(event instanceof HttpResponse){
                    //setTimeout(()=>{
                        this.commonService.hideSpinner();
                        console.log("Response from interceptor");
                        console.log(event);
                    //},2000) 
                }
            }),
            catchError((error: HttpErrorResponse)=>{
                this.commonService.hideSpinner();
                //controlling HTTP ERROR GLOBALLY from INTERCEPTOR & showing an error modal
                const err = error?.error?.error?.message ? error?.error?.error?.message : error.message;
                this.openCommonErrorModal(err);
                return throwError(error);
            })
        )
    }

    openCommonErrorModal(msg: string): void{
        //show error modal
        this.commonService.openErrorModal(msg);
    }


}