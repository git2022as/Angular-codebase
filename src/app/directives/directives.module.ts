import { NgModule } from "@angular/core";
import { CouponGreenColorDirective } from "./coupon-green-color.directives";
import { CardNumberDirective } from "./card-number.directive";
import { CardExpiryDirective } from "./card-expiry.directive";
import { OnlyNumberDirective } from "./onlyNumber.directive";

@NgModule({
    imports: [],
    declarations: [ CouponGreenColorDirective, 
                    CardNumberDirective, 
                    CardExpiryDirective, 
                    OnlyNumberDirective
                ],
    exports: [  CouponGreenColorDirective, 
                CardNumberDirective, 
                CardExpiryDirective, 
                OnlyNumberDirective
            ]
})

export class DirectiveModule {}