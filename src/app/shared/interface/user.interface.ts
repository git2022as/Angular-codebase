export interface userInterface {
    bio: string | null,
    email: string,
    image: string,
    token: string,
    username: string
}

export interface registerUserInterface {
    user: {
        email: string,
        password: string,
        username: string
    }
}

export interface RegisterAuthInterface {
    isSubmitted: boolean
}