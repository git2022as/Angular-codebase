//initial state
import { RegisterAuthInterface } from "../shared/interface/user.interface";

export const registerAuthInitialState: RegisterAuthInterface = {
    isSubmitted: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null
}