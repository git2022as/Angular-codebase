import { NgModule } from "@angular/core";
import { QuantityPipe } from "./quantity.pipe";

@NgModule({
    declarations: [
        QuantityPipe
    ],
    exports: [
        QuantityPipe
    ]
})

export class PipeModule {}