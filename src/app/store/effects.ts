import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { registerUserInterface, userInterface } from '../shared/interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RegisterEffects {

    constructor(private authService: AuthService,
                private action$: Actions,
                private router: Router) {}

    register$ = createEffect(()=> (
        this.action$.pipe(
            ofType(registerAction),
            switchMap((data)=>{
                return this.authService.signUpUser(data).pipe(
                    map((currentUser: userInterface)=>{
                        return registerSuccessAction({currentUser})
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(registerFailureAction(errorResponse.error))
                    })
                )
            })
        ))
    )

    registerSuccess$ = createEffect(()=>(
            this.action$.pipe(
                ofType(registerSuccessAction),
                tap(()=>{
                    console.log("register success triggered");
                    this.router.navigate(['/auth/login']);
                })
            )

        ),
        {dispatch: false} //so that this effect doesn't return anything //VVIMP
    )

}