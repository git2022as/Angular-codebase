import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from './app.cache.service';
import { DataService } from './data.service';
import { StaticMsg, staticValue } from '../constants/constant';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private bsModalService: BsModalService,
                private appCacheService: AppCacheService,
                private dataService: DataService,
                private bsModalRef: BsModalRef){}

    openStaticModal(data: any): BsModalRef{
        return this.bsModalService.show(
            StaticDialogNgxBootstrapComponent, data)
    }

    CommonGoToTopEvent(id: string): void{
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    }

    logoutService(): void{
        //if admin login is true then logout from admin service only
        if(this.appCacheService._adminLoggedIn){
            this.appCacheService._adminLoggedIn = false;
        }
        else{
            //wehn normal user is logged in
            this.appCacheService._loggedInUser = false;
            this.appCacheService._UID = "";
            this.appCacheService._token = "";
            this.appCacheService._loggedInUserName = "";
            this.appCacheService._loggedInUserEmail = "";
            this.appCacheService._cartDetails = [];
            this.appCacheService._carosulDetails = [];
            this.appCacheService._dishesDetails = [];
            this.appCacheService._offersDetails = [];
            this.appCacheService._profileDetails = {};
            localStorage.clear();
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
              primaryButtonText: 'Ok',
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
}