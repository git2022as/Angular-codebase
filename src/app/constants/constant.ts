export const cartExtraItems = [
    {name: "Extra Cheese", extraPrice: 20},
    {name: "Oliv Oil Cooking", extraPrice: 30},
] as const;

export const offerSubSections = [
    "Credit Card", "Debit Card"
]

export const StaticMsg = {
    addQuantity: "You can't buy more than 5 quantities of any dish at a time.",
    removeQuantity: "Atleast one quantity should be added.",
    withoutLoginNoCartAccess: "Please login first to add this dish in the cart",
    withoutCartNoPaymentAccess: "Please add any item to cart to view payment page",
    adminDeActivateMsg: "You have unsaved changes. Do you really want to discard these chages?",
    removeFromCartConfirmation: "Are you sure want to remove this item from cart?",
    removeFromCartTitle: "Remove From Cart",
    logoutConfirmationText: "Are you sure want to logout?",
    logoutConfirmationTitle: "Logout",
    deleteItemConfirmationText: "Are you sure want to delete the item?",
    deleteItemConfirmationTitle: "Delete Item",
    uidMissingError: "We are not able to add this dish into the cart. Please try again later.",
    commonError: "We are not able to process your request right now, please try again later.",
    terms_condition_disclaimer: "By creating an account, I accept the Terms & Conditions & Privacy Policy",
    admin_no_data_change: "It seems, you haven't changed any value yet",
    admin_data_updated: "has been updated",
    admin_data_added: "has been added",
    admin_data_duplicate: "Duplicate item, please add a new item",
    admin_data_deleted: "has been deleted",
    admin_table_header_sort_tooltip: "Click on header to sort the respective column data",
    admin_orderedKeyStatus: "ordered",
    admin_inTransStatus: "In-Transit",
    admin_inTransKeyStatus: "In-Transit",
    admin_deliveredStatus: "Delivered",
    admin_deliveredKeyStatus: "delivered",
    calorie_lable: "Calorie Details (in mg)",
    calorie_chart_type: "doughnut",
    pin_available_success: "Delivery is available to this location",
    profile_update_success: "Profile has been updated",
    profile_add_success: "Profile has been added",
    password_update_success: "Password has been updated",
    email_update_success: "Email has been updated",
    admin_dashboard_table_lable: "Ordered Quantity"
} as const;

export const admin_headers = {
    dish: ["Dish Name","Dish Price", "Actions"],
    slide: ["Slide Name", "Slide Details", "Actions"],
    offer: ["Slide Name", "Slide Details", "Actions"],
    coupon: ["Coupon Code", "Coupon Type", "Actions"],
    branch: ["Branch Name", "Branch Contact", "Actions"],
    dashboardOrderAnalysis: ["Total Orders", "Average Dish/Order", "Average Price/Order", "Maximum Used Payment Option"],
    dashboardItemAnalysis: ["Maximum Ordered Item", "Maximum Ordered Item Quantity", "Minimum Ordered Item", "Minimum Ordered Item Quantity", "Top Veg Item", "Top Non-veg Item"],
    disclaimer: [
        "This is a dummy website.",
        "Create profile with your email id",
        "You can reset your password, change your email id, password at anytime",
        "Admin can check the order analysis with admin credentials",
        "Please do not use your real credentials to signup/login",
        "Realtime payment method is not working"
    ]
}

export const staticValue = {
    maxQuantityInCart : 5,
    minQuantityInCart: 1,
    deliveryCharge: 50,
    packagingCharge: 30,
    gstPercent: 10,
    caouselInterval: 2000,
    passwordMaxLength: 10,
    passwordMinLength: 6,
    timeForMsg: 2000,
    govtTaxPackage: 0,
    appDiscountAmount: 0,
    totalNoOfPage: 0,
    currentPage: 1,
    perPageOptions: [5,10,15,20],
    mapZoom: 4,
    calorieHoverOffset: 4,
    pincodeLength: 6,
    offersAvailableCount: 0,
    extraAddressFormCount: 0,
    phoneNumberLength: 10, 
    streetMaxLength: 100, 
    profileNameMaxLenght: 40,
    profileNameMinLength: 2,
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
    itemBackgroudColor: [
        'red',
        'green',
        'blue',
        'yellow',
        'pink',
        'black',
        'brown',
        'violet',
        'cyan',
        'gold',
        'chocolate',
        'gray'
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
    resetPassLinkUrl: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=",
    changePasswordUrl: "https://identitytoolkit.googleapis.com/v1/accounts:update?key=",
    changeEmailUrl: "https://identitytoolkit.googleapis.com/v1/accounts:update?key="
}

export const errorMessages = {
    emailRequired: "Enter a valid email address",
    passwordRequired: "Enter a valid password",
    passwordRequirement: "Enter 6-10 characters password with one capital, one number and one special character",
    confirmPasswordRequired: "Confirm password is required",
    confirmPasswordNoMatch: "The password confirmation doesn't match",
    invalidUPI: "Please provide a correct UPI ID",
    invalidCard: "Please provide 16 digits card number",
    invalidCardExpiry: "Please provide proper card expiry details",
    invalidCardCvv: "Please provide 3 digits card CVV details",
    ratingRequired: "Select a rating from 1 to 5",
    commentRequired: "Enter a valid review/comment",
    pincodeRequired: "Enter a 6 digits pincode in number only",
    adminLoginError: "Admin login failed, please check credentials.",
    adminLoginRequired: "Enter a valid user name",
    paymentDeliveryAddRequired: "Select the delivery address",
    profileNameRequired: "Enter a valid name & minimum charcater requirements is 2",
    profilePhoneRequired: "Enter a valid 10 digits phone number",
    profileHouseRequired: "Enter a valid house & street details",
    profileCityRequired: "Please select the proper city",
    profileStateRequired: "Please select the proper state applicable for the city.",
    adminDishNameRequired: "Enter a valid dish name",
    adminDishOriginRequired: "Select the proper dish origin",
    adminDishImageRequired: "Enter a valid dish image",
    adminDishImageAltRequired: "Enter a valid dish image alt text",
    adminDishDescRequired: "Enter a proper description for the dish",
    adminDishPriceRequired: "Enter a valid price for the dish",
    adminDishCompRequired: "Enter details of complementary items",
    adminDishIngRequired: "Enter all major ingradient details",
    adminDishIngFatRequired: "Enter Fat details",
    adminDishIngChoRequired: "Enter Cholesterol details",
    adminDishIngSodiumRequired: "Enter Sodium details",
    adminDishIngCarRequired: "Enter Carbohydrate details",
    adminDishIngProRequired: "Enter Protein details",
    adminDishIngCalRequired: "Enter Calcium details",
    adminDishIngPotaRequired: "Enter Potassium details",
    adminOfferCodeRequired: "Enter a valid offer code",
    adminOfferMinRequired: "Enter a valid minimum order amount",
    adminOfferSecRequired: "Select the proper section",
    adminOfferByRequired: "Enter a valid offered by institution name",
    adminOfferDisRequired: "Enter the flat discount amount",
    adminBranchLocRequired: "Enter a valid location of branch",
    adminBranchPinRequired: "Enter a valid 6 digits pincode of the branch",
    adminBranchLatRequired: "Enter a valid latitude of the branch",
    adminBranchLongiRequired: "Enter a valid longitude of the branch",
    adminBranchImageRequired: "Enter a valid image name of the branch",
    adminBranchContactRequired: "Enter a valid contact number (only number without 0/+91)",
    adminBranchTimeRequired: "Enter a valid operation timing of the branch(exp - 11AM - 11PM)",
    adminCouponCodeRequired: "Enter a valid coupon code",
    adminCouponCodeDescRequired: "Enter a valid coupon code description",
    adminCouponMethodRequired: "Select the proper discount method",
    adminCouponDisRequired: "Enter a valid discount amount/percentage",
    adminSlideImgRequired: "Enter a valid image source name",
    adminSlideImgAltRequired: "Enter a valid alternative text for image",
    adminSlideCaroslRequired: "Enter a valid carousel text"
}

export const city = [
    "Delhi",
    "Gurgaon",
    "Noida",
    "Mumbai",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Bangalore",
    "Bhubaneshwar",
    "Patna",
    "Kolkata",
    "Guahati"
];

export const state = [
    "Delhi",
    "Maharastra",
    "Telengana",
    "Tamilnadu",
    "Karnataka",
    "Uttar Pradesh",
    "Orisha",
    "Bihar",
    "West Bengal",
    "Assam"
];

export enum pp {
    name = "tom",
    street = "kolkata"
}

export const config = {
    discount: {
        value: '',
        required: true,
        type: 'dropdown',
        placeholder: 'Select',
        options: [
            {
                key: 1,
                value: 'nominal'
            },
            {
                key: 2,
                value: 'percent'
            }
        ],
        name: 'discount'
    },
    description: {
        value: 'description is working',
        required: true,
        type: 'textarea',
        placeholder: 'Description',
        name: 'description'
    },
    nominal: {
        value: '',
        required: true,
        type: 'text',
        placeholder: 'Nominal value',
        name: 'nominal',
        customValidator: {
            nominalValidation: true
        },
        errorLabel: {
            nominalNumber: 'Only number is allowed'
        }
    },
    percent: {
        value: '5678',
        required: true,
        type: 'text',
        placeholder: 'Percent value',
        name: 'percent'
    }
  };
  