export const cartExtraItems = [
    {name: "Extra Cheese", extraPrice: 20},
    {name: "Oliv Oil Cooking", extraPrice: 30},
] as const;

export const StaticMsg = {
    addQuantity: "You can't buy more than 5 quantities of any dish at a time.",
    removeQuantity: "Atleast one quantity should be added.",
    withoutLoginNoCartAccess: "Please login first to add this dish in the cart",
    adminDeActivateMsg: "You have unsaved changes. Do you really want to discard these chages?",
    removeFromCartConfirmation: "Are you sure want to remove this item from cart?",
    removeFromCartTitle: "Remove From Cart",
    logoutConfirmationText: "Are you sure want to logout?",
    logoutConfirmationTitle: "Logout",
    deleteItemConfirmationText: "Are you sure want to delete the item?",
    deleteItemConfirmationTitle: "Delete Item",
    uidMissingError: "We are not able to add this dish into the cart. Please try again later.",
    commonError: "We are not able to process your request right now, please try again later.",
    terms_condition_disclaimer: "By creating an account, I accept the Terms & Conditions & Privacy Policy"
} as const;

export const staticValue = {
    maxQuantityInCart : 5,
    minQuantityInCart: 1,
    deliveryCharge: 50,
    packagingCharge: 30,
    gstPercent: 10,
    chartBackgroudColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(86 255 138)',
        'rgb(86 255 242)',
        'rgb(252 86 255)',
        'rgb(50 7 7)',
        'rgb(122 97 171)',
        'rgb(22 205 234)'
    ],
    paginationPerPageConstant : 5
}

export const tokenUrL = {
    noToken: [
        'slides.json',
        'shopLocation.json',
        'dishes.json',
        'offers.json'
    ]
}

export const firebaseAPI = {
    APIKey: "AIzaSyDcutmqTaP7lZ_oULyv3_hEIeWmfanBfzY",
    signUpUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    signInUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    resetPassLinkUrl: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key="
}

export const errorMessages = {
    emailRequired: "Enter a valid email address",
    passwordRequired: "Enter a valid password",
    emailRequirement: "Enter 6-10 characters password with one capital, one number and one special character",
    confirmPasswordRequired: "Confirm password is required",
    confirmPasswordNoMatch: "The password confirmation doesn't match",
    invalidUPI: "Please provide a correct UPI ID",
    invalidCard: "Please provide 16 digits card number",
    invalidCardExpiry: "Please provide proper card expiry details",
    invalidCardCvv: "Please provide 3 digits card CVV details"
}