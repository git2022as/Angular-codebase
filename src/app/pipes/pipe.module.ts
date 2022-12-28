import { NgModule } from "@angular/core";
import { QuantityPipe } from "./quantity.pipe";
import { IndividualCartPipe } from "./individual-cart.pipe";
import { CartNamePipe } from './cart-name.pipe';
import { CartDescriptionPipe } from './cart-description.pipe';
import { CartOriginPipe } from './cart-origin.pipe';
import { CartProductQuantityPipe } from './cart-product-quantity.pipe';
import { CartImageAltPipe } from './cart-image-alt.pipe';
import { CartImagePipe } from './cart-image.pipe';
import { CartItemOriginalPricePipe } from './cart-item-original-price.pipe';
import { ProductDescriptionPipe } from './product-description.pipe';

@NgModule({
    declarations: [
        QuantityPipe,
        IndividualCartPipe,
        CartNamePipe,
        CartDescriptionPipe,
        CartOriginPipe,
        CartProductQuantityPipe,
        CartImageAltPipe,
        CartImagePipe,
        CartItemOriginalPricePipe,
        ProductDescriptionPipe
    ],
    exports: [
        QuantityPipe,
        IndividualCartPipe,
        CartNamePipe,
        CartDescriptionPipe,
        CartOriginPipe,
        CartProductQuantityPipe,
        CartImageAltPipe,
        CartImagePipe,
        CartItemOriginalPricePipe,
        ProductDescriptionPipe
    ]
})

export class PipeModule {}