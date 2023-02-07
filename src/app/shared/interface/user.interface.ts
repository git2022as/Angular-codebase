export interface userInterface {
    bio: string | null,
    email: string,
    image: string,
    token: string,
    username: string
}

export interface registerUserInterface {
    email: string,
    password: string,
    username: string
}

export interface backendErrorsInterface {
    [key: string] : string[]
}

export interface RegisterAuthInterface {
    isSubmitted: boolean,
    currentUser: userInterface | null,
    isLoggedIn: boolean | null,
    validationErrors: backendErrorsInterface | null
}