import { NgModule } from "@angular/core";
import { CouponPinkColorDirective } from "./coupon-pink-color.directives";
import { CardNumberDirective } from "./card-number.directive";
import { CardExpiryDirective } from "./card-expiry.directive";
import { OnlyNumberDirective } from "./onlyNumber.directive";

@NgModule({
    imports: [],
    declarations: [ CouponPinkColorDirective, 
                    CardNumberDirective, 
                    CardExpiryDirective, 
                    OnlyNumberDirective
                ],
    exports: [  CouponPinkColorDirective, 
                CardNumberDirective, 
                CardExpiryDirective, 
                OnlyNumberDirective
            ]
})

export class DirectiveModule {}