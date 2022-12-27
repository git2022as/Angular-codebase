import { NgModule } from "@angular/core";
import { QuantityPipe } from "./quantity.pipe";
import { IndividualCartPipe } from "./individual-cart.pipe";
import { CartNamePipe } from './cart-name.pipe';
import { CartDescriptionPipe } from './cart-description.pipe';
import { CartOriginPipe } from './cart-origin.pipe';
import { CartProductQuantityPipe } from './cart-product-quantity.pipe';
import { CartImageAltPipe } from './cart-image-alt.pipe';
import { CartImagePipe } from './cart-image.pipe';

@NgModule({
    declarations: [
        QuantityPipe,
        IndividualCartPipe,
        CartNamePipe,
        CartDescriptionPipe,
        CartOriginPipe,
        CartProductQuantityPipe,
        CartImageAltPipe,
        CartImagePipe
    ],
    exports: [
        QuantityPipe,
        IndividualCartPipe,
        CartNamePipe,
        CartDescriptionPipe,
        CartOriginPipe,
        CartProductQuantityPipe,
        CartImageAltPipe,
        CartImagePipe
    ]
})

export class PipeModule {}