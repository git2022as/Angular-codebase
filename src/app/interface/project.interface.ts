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

export interface reactiveChildInterface {
    label?: string,
    value: string, //MANDATORY = initial value for all inputs
    type?: string, //OPTIONAL = input type
    placeholder?: string, //OPTIONAL = placeholder for dropdown/input/textarea
    name: string, //MANDATORY = formcontrol name which must be same as key of config constant
    maxlength?: number, //OPTIONAL = restrict input characters
    minlength?: number, //OPTIONAL = restrict input characters
    rows?: number, //OPTIONAL = rows count for textarea
    cols?: number, //OPTIONAL = columns count for textarea
    options?: Array<{ key: number; value: string; }> | null, //OPTIONAL = only for dropdown options
    validation?: Array<any> | null, //OPTIONAL = all validations like required, email, pattern, custom etc
    errorLabel?: Array<any> | null //OPTIONAL = all error values
}

export interface tableInterface {
    header: Array<any>,
    content: Array<any>,
    checkbox: boolean
}

export interface multiTableInterface {
    label: string,
    data: Array<{key: number, value: string}>,
    value: Array<{key: number, value: string}>,
    placeholder: string,
    name: string,
    validation: Array<any> | null,
    errorLabel: Array<any> | null
}