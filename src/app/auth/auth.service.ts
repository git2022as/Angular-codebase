import { Injectable } from "@angular/core";
import { baseUrl } from "../shared/constant/url.constant";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { userInterface, registerUserInterface } from "../shared/interface/user.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = baseUrl;

    constructor(private http: HttpClient) {}

    signUpUser(data : {user: registerUserInterface}): Observable<any>{
        return this.http.post(`${baseUrl}api/users`, data);
    }

}