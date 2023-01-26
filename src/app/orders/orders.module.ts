import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersComponent } from "./orders.component";
import { SharedModule } from "../shared/shared.module";
import { OrdersRoutingModule } from "./orders-routing.module";

@NgModule({
    declarations: [
        OrdersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    exports: [
        OrdersComponent
    ]
})

export class OrdersModule {}