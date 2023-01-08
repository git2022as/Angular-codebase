import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private angularFireAuth: AngularFireAuth) {}

    //login scenario
    getLogin(value: any): Promise<any>{
        const email = value.emailAddress;
        const password = value.password;
        return this.angularFireAuth.signInWithEmailAndPassword(email,password);
    }

    //signup scenario
    createUser(value: any): Promise<any>{
        const email = value.email;
        const password = value.password;
        return this.angularFireAuth.createUserWithEmailAndPassword(email,password);
    }

    logoutUser(): Promise<any>{
        return this.angularFireAuth.signOut();
    }

}