import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentComponent } from "./payment.component";
import { PaymentRoutingModule } from "./payment-routing.module";
import { MatIconModule } from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectiveModule } from "../directives/directives.module";

@NgModule({
    declarations: [
        PaymentComponent
    ],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        MatIconModule,
        TooltipModule.forRoot(),
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        DirectiveModule
    ],
    exports: [
        PaymentComponent
    ]
})

export class PaymentModule {}