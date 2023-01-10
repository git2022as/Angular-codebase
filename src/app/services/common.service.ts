import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from './app.cache.service';
import { DataService } from './data.service';
import { StaticMsg } from '../constants/constant';

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
            this.appCacheService._refreshToken = "";
            this.appCacheService._loggedInUserName = "";
            this.appCacheService._loggedInUserEmail = "";
            this.appCacheService._cartDetails = [];
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
}