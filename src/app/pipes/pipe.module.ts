import { NgModule } from "@angular/core";
import { QuantityPipe } from "./quantity.pipe";
import { IndividualCartPipe } from "./individual-cart.pipe";

@NgModule({
    declarations: [
        QuantityPipe,
        IndividualCartPipe
    ],
    exports: [
        QuantityPipe,
        IndividualCartPipe
    ]
})

export class PipeModule {}