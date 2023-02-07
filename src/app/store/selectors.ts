import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RegisterAuthInterface } from "../shared/interface/user.interface";

const registerAuthSelector = createFeatureSelector('registerAuth');

export const isSubmittedSelector = createSelector(
    registerAuthSelector,
    (authState: RegisterAuthInterface) => { return authState.isSubmitted}
)