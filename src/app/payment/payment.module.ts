import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from "./payment.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { MatIconModule } from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        MatIconModule,
        TooltipModule.forRoot()
    ],
    exports: [
        PaymentComponent
    ]
})

export class PaymentModule {}