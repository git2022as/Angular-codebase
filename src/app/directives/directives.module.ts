import { NgModule } from "@angular/core";
import { CouponGreenColorDirective } from "./coupon-green-color.directives";
import { CardNumberDirective } from "./card-number.directive";
import { CardExpiryDirective } from "./card-expiry.directive";

@NgModule({
    imports: [],
    declarations: [CouponGreenColorDirective, CardNumberDirective, CardExpiryDirective],
    exports: [CouponGreenColorDirective, CardNumberDirective, CardExpiryDirective]
})

export class DirectiveModule {}