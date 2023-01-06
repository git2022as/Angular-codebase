import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from './app.cache.service';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private bsModalService: BsModalService,
                private appCacheService: AppCacheService){}

    openStaticModal(data: any): BsModalRef{
        return this.bsModalService.show(
            StaticDialogNgxBootstrapComponent, data)
    }

    CommonGoToTopEvent(id: string): void{
        document.getElementById(id).scrollIntoView({behavior: 'smooth'});
    }

    logoutService(): void{
        this.appCacheService._loggedInUser = false;
        this.appCacheService._adminLoggedIn = false;
        this.appCacheService._cartDetails = [];
        this.appCacheService._carosulDetails = [];
        this.appCacheService._dishesDetails = [];
        this.appCacheService._offersDetails = [];
        this.appCacheService._tokenSID = "";
    }
}