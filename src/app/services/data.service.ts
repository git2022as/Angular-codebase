import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    UPDATED_DISH = new BehaviorSubject(false);
    UPDATE_CART_COUNT = new BehaviorSubject(false);
    UPDATE_SPINNER = new BehaviorSubject(false);
}