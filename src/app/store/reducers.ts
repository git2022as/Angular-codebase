import { Action, createReducer, on } from "@ngrx/store";
/* actions, initial state & auth interface for register reducer */
import { RegisterAuthInterface } from "../shared/interface/user.interface";
import { registerAction } from "./actions";
import { registerAuthInitialState } from "./initialState";
/* END */

const registerReducer = createReducer(
    registerAuthInitialState,//initial state which is an object
  on(
    registerAction,//Action name //can have multiple actions
    (state: RegisterAuthInterface) => ({ ...state, isSubmitted : true })
  )
)

//Always export that reducer function like the below
export function regReducer(state: RegisterAuthInterface, action: Action){
    return registerReducer(state, action)
}