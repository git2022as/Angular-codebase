export interface cartExtraItem {
    name: string,
    value: boolean,
    extraPrice: number
}

export interface deactivateInterface{
    canExit: () => boolean;
}

export interface signUpResponse{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface signInResponse{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}