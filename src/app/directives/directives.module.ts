import { NgModule } from "@angular/core";
import { CouponPinkColorDirective } from "./coupon-pink-color.directives";
import { CardNumberDirective } from "./card-number.directive";
import { CardExpiryDirective } from "./card-expiry.directive";
import { OnlyNumberDirective } from "./onlyNumber.directive";
import { AutoFocusDirective } from "./autoFocus.directive";

@NgModule({
    imports: [],
    declarations: [ CouponPinkColorDirective, 
                    CardNumberDirective, 
                    CardExpiryDirective, 
                    OnlyNumberDirective,
                    AutoFocusDirective
                ],
    exports: [  CouponPinkColorDirective, 
                CardNumberDirective, 
                CardExpiryDirective, 
                OnlyNumberDirective,
                AutoFocusDirective
            ]
})

export class DirectiveModule {}