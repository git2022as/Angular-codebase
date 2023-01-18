import { Injectable } from "@angular/core";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppCacheService } from "../services/app.cache.service";
import { CommonService } from "../services/common.service";
import { StaticMsg } from "../constants/constant";

@Injectable({
    providedIn: 'root'
})

export class PaymentModuleAuthenticationGuardService implements CanActivate {

    constructor(private appCacheService: AppCacheService,
                private commonService: CommonService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.appCacheService._cartDetails.length > 0){
            return true;
        }
        else{
            this.commonService.openErrorModal(StaticMsg.withoutCartNoPaymentAccess); 
            return false;
        }
    }
}