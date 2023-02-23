export interface cartExtraItem {
    name: string,
    value: boolean,
    extraPrice: number
}

export interface deactivateInterface {
    canExit: () => boolean;
}

/* sign up */

export interface signUpRequestInterface {
    email: string,
    password: string,
    confirmPassword: string
}

export interface signUpResponseInterface {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}
/* sign up */

/* login */
export interface signInRequestInterface {
    emailAddress: string,
    password: string
}

export interface signInResponseInterface {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}
/* login */

/* offers - sub-section */
export interface offersSubSectionInterface{
    subSectionValue: boolean,
    subSectionText: string
}

export interface finalPaymentInterface {
    appDiscountAmount: number,
    deliveryAmount: number,
    deliveryFree: boolean,
    finalPay: number,
    govtTaxPackage: number,
    totalCartValue: number
}

export interface couponInterface {
    couponCode: string,
    couponDescription: string,
    couponDiscount: number,
    couponDiscountMethod: string,
    id: string
}

/* profile interface */
export interface profileInterface {
    name: string,
    phoneNumber: number,
    deliveryAddress: {
        city: string,
        pincode: number,
        state: string,
        street: string
    },
    secondDeliveryAddress: [
        {
            city: string,
            pincode: number,
            state: string,
            street: string
        }
    ] | []
}

export interface reactiveChildInterface{
    value: string,
    type?: string,
    placeholder: string,
    name: string,
    maxlength?: number,
    minlength?: number,
    rows?: number,
    cols?: number,
    options?: Array<{ key: number; value: string; }> | null,
    validation?: Array<any> | null,
    errorLabel?: Array<any> | null
}

export interface tableInterface{
    header: Array<any>,
    content: Array<any>,
    checkbox: boolean
}