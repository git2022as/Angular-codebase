import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from './app.cache.service';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private bsModalService: BsModalService,
                private appCacheService: AppCacheService,
                private dataService: DataService){}

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

}