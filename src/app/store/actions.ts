import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./actionTypes";
import { backendErrorsInterface, registerUserInterface, userInterface } from "../shared/interface/user.interface";
import { Action } from "rxjs/internal/scheduler/Action";

export const registerAction =  createAction(
    ActionTypes.REGISTER,
    props<{user: registerUserInterface}>() //props is the additional metadata to handle the request
)

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{currentUser: userInterface}>()
)

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<{errors: backendErrorsInterface}>()
)