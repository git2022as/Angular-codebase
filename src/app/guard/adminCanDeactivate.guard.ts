import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StaticMsg } from "../constants/constant";
import { deactivateInterface } from '../interface/project.interface'; 

@Injectable({
    providedIn: 'root'
})

export class AdminCanDeactivateGuardService implements CanDeactivate<deactivateInterface>{
    canDeactivate(component: deactivateInterface, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
        return component.canExit();
    }
}