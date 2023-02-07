import { Action, createReducer, on } from "@ngrx/store";
/* actions, initial state & auth interface for register reducer */
import { RegisterAuthInterface } from "../shared/interface/user.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "./actions";
import { registerAuthInitialState } from "./initialState";
/* END */

const registerReducer = createReducer(
    registerAuthInitialState,//initial state which is an object
  on(
    registerAction,//Action name //can have multiple actions
    (state: RegisterAuthInterface, action) => (
        { ...state,
          isSubmitted : true,
          validationErrors: null
        }
      )
  ),
  on(
    registerSuccessAction,
    (state: RegisterAuthInterface, action) => (
      {
        ...state,
        isSubmitted: false,
        currentUser: action.currentUser,
        isLoggedIn: true,
        validationErrors: null
      }
    )
  ),
  on(
    registerFailureAction,
    (state, action) => ({
      ...state,
      isSubmitted: false,
      currentUser: null,
      isLoggedIn: null,
      validationErrors: action.errors
    })
  )
)

//Always export that reducer function like the below
export function regReducer(state: RegisterAuthInterface, action: Action){
    return registerReducer(state, action)
}