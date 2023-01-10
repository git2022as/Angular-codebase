export const cartExtraItems = [
    {name: "Extra Cheese", extraPrice: 20},
    {name: "Oliv Oil Cooking", extraPrice: 30},
] as const;

export const coupon = [
    {
        code: "JAN2023",
        offer: "Flat 10% discount on the final CART value",
        discountPercent: true,
        discountAmout: 10
    },
    {
        code: "FLAT300",
        offer: "Flat 300 INR discount on the final CART value",
        discountPercent: false,
        discountAmout: 300
    }
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
    deleteItemConfirmationTitle: "Delete Item"
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
    ]
}

export const tokenUrL = {
    noToken: [
        'slides.json',
        'shopLocation.json',
        'dishes.json',
        'offers.json'
    ]
}