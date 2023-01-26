import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders.component";

const ordersRoutes : Routes = [
    {
        path: '',
        component: OrdersComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(ordersRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OrdersRoutingModule {}

