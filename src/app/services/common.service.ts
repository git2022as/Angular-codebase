import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from './app.cache.service';
import { DataService } from './data.service';
import { StaticMsg, staticValue } from '../constants/constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProductAddOnComponent } from '../shared/product-add-on/product-add-on.component';
import { AuthService } from './auth.service';
import { multiTableInterface, reactiveChildInterface } from '../interface/project.interface';
import { customValidator } from '../validator/custom.validator';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    baseUrl = environment.firbaseAPI;

    constructor(private bsModalService: BsModalService,
                private appCacheService: AppCacheService,
                private dataService: DataService,
                private bsModalRef: BsModalRef,
                private http: HttpClient,
                private authService: AuthService){}

    openStaticModal(data: any): BsModalRef{
        return this.bsModalService.show(
            StaticDialogNgxBootstrapComponent, data)
    }

    CommonGoToTopEvent(id: string): void{
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    }

    setControlsValueToBlank(control: string, value: string, formname: FormGroup): void{
        value == 'text' ? formname.get(control).setValue('') : formname.get(control).setValue(null);
    }

    logoutService(): void{
        localStorage.clear();
        //if admin login is true then logout from admin service only
        if(this.appCacheService._adminLoggedIn){
            this.appCacheService._adminLoggedIn = false;
            //localStorage.removeItem('adminLoggedIn');
        }
        else{
            //wehn normal user is logged in
            this.appCacheService._loggedInUser = false;
            this.appCacheService._UID = "";
            this.appCacheService._token = "";
            this.appCacheService._loggedInUserName = "";
            this.appCacheService._loggedInUserEmail = "";
            this.appCacheService._cartDetails = [];
            this.dataService.UPDATE_CART_COUNT.next(true);
            this.dataService.UPDATED_DISH.next(true);
            this.appCacheService._carosulDetails = [];
            this.appCacheService._dishesDetails = [];
            this.appCacheService._offersDetails = [];
            this.appCacheService._profileDetails = {};
        }
    }

    showSpinner(): void{
        this.dataService.UPDATE_SPINNER.next(true);
    }

    hideSpinner(): void{
        this.dataService.UPDATE_SPINNER.next(false);
    }

    openErrorModal(msg: string): void{
        const initialState: ModalOptions = {
            initialState: {
              content: msg,
              title: 'Error',
              type: 'error',
              data: 'para',
              primaryButtonText: 'OK',
            },
        }
        this.bsModalRef = this.openStaticModal(initialState);
    }

    openConfirmationModal(content: string,title: string): BsModalRef{
        const initialState: ModalOptions = {
            initialState: {
            content: content,
            title: title,
            type: 'confirmation',
            data: 'para',
            secondaryButton: true,
            primaryButtonText: 'Yes'
            }
        }
        this.bsModalRef = this.openStaticModal(initialState);
        return this.bsModalRef;
    }

    //prevent button icon click 
    clickDisabled(event: Event): void{
        event.preventDefault();
    }

    //admin check duplicate value
    checkDuplicate(value: string,arr: Array<any>,key: any): boolean{
        let dup = false;
        if(arr){
          arr.forEach((x)=>{if(x[key] == value)
            {dup = true;}
          });
        }
        return dup;
    }

    //Review ADD/UPDATE API call
    addReviews(id: string, uid: string, review: {rating: number,comment: string},method: string, reviewId?: string): Observable<any>{
        let finalData = {user: this.appCacheService._loggedInUserEmail, ...review};
        if(method == 'add')
            return this.http.post(`${this.baseUrl}/reviews/${id}/${uid}.json`,finalData);
        else
            return this.http.put(`${this.baseUrl}/reviews/${id}/${uid}/${reviewId}.json`,finalData); 
    }

    //Review get API call
    getReviews(id: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/reviews/${id}.json`);
    }

    //Review delete API call
    deleteReviews(id: string, uid: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}/reviews/${id}/${uid}.json`);
    }

    //add orders API CALL
    addOrders(uid: string, order: any): Observable<any>{
        return this.http.post(`${this.baseUrl}/orders/${uid}.json`, order);
    }

    //get orders API CALL
    getOrders(uid: string): Observable<any>{
        return this.http.get(`${this.baseUrl}/orders/${uid}.json`);
    }

    /* pagination function */
    //call from component
    loadPagination(data: Array<any>, perPageData?: number, curretPage?: number): Array<any>{
        let arr = [];
        let startIndex = 0;
        let endIndex = 5;

        if(!curretPage)
            curretPage = 1;
        if(!perPageData)
            perPageData = staticValue.paginationPerPageConstant;

        if(curretPage == 1){
            startIndex = 0;
            endIndex = perPageData;
        }
        else{
            endIndex = (curretPage*perPageData) > data.length ? data.length : (curretPage*perPageData);
            startIndex = perPageData*(curretPage-1);
        }

        if(data.length > 0){
            arr = [...data].slice(startIndex,endIndex);
        }
        return arr;
    }

    //call from pagination component
    totalNoOfPage(data: Array<any>, perPageData?: number): number{
        let totalPages = 0;
        const len = data.length;
        if(len > 0 && perPageData > 0)
            totalPages = Math.ceil(len/perPageData);
        return totalPages;
    }

    //call to check pagination icon/button status
    getPaginationButtonStatus(totalNoOfPage: number, currentPage: number): any{
        let obj = {
            first: false,
            previous: false,
            next: false,
            last: false
        }

        if(currentPage == totalNoOfPage){
            if(currentPage == 1){
                obj.first = true;
                obj.previous = true;
                obj.next = true;
                obj.last = true;
            }
            else{
                obj.first = false;
                obj.previous = false;
                obj.next = true;
                obj.last = true;
            }
        }
        else{
            if(currentPage == 1){
                obj.first = true;
                obj.previous = true;
                obj.next = false;
                obj.last = false;
            }
            else{
                obj.first = false;
                obj.previous = false;
                obj.next = false;
                obj.last = false;
            }
        }

        return obj;
    }

    /* open Add-on Modal common service code */

    openAddOn(price): any{
        const initialState: ModalOptions = {
          initialState: {
            EachItemPrice: price,
            title: this.appCacheService._content.addOnItems
          },
        }
        return this.bsModalService.show(ProductAddOnComponent,initialState);
    }

    /* common code to add formControl */
    addControls(formName: FormGroup, properties: reactiveChildInterface | multiTableInterface){
        if(properties.validation && properties.validation.length > 0){
            let item = properties.validation[0];
            for(let key in item){
                if(key == 'required' || key == 'email')
                    formName.get(properties.name).addValidators(Validators[key]);
                else    
                    formName.get(properties.name).addValidators(customValidator[key]); 
            }
        }
    }
    
}