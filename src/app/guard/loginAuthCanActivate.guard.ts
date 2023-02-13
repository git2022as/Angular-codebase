import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppCacheService } from "../services/app.cache.service";
import { CommonService } from "../services/common.service";
import { StaticMsg } from '../constants/constant';

@Injectable({
    providedIn: 'root'
})

export class LoginAuthCanActivateGuardService implements CanActivate{

    constructor(private appCacheService: AppCacheService,
                private commonService: CommonService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userdata = JSON.parse(localStorage.getItem('userData'));
        if(userdata){
            return true;
        }
        else{
            this.commonService.openErrorModal(StaticMsg.withoutLoginNoCartAccess);
            return false;
        }
    }
}
