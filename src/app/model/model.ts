export const cartExtraItems = [
    {name: "Extra Cheese", extraPrice: 20},
    {name: "Oliv Oil Cooking", extraPrice: 30},
]

export const coupon = [
    {
        code: "DEC2022",
        offer: "Flat 10% discount on final CART value",
        discountPercent: true,
        discountAmout: 10
    },
    {
        code: "FLAT300",
        offer: "Flat 300 INR discount on final CART value",
        discountPercent: false,
        discountAmout: 300
    }
]

export const staticValue = {
    maxQuantityInCart : 5,
    minQuantityInCart: 1,
    deliveryCharge: 50,
    packagingCharge: 30,
    gstPercent: 10

}