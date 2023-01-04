import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentComponent } from "./payment.component";

const paymentRoutes: Routes = [
    {
        path: '',
        component: PaymentComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(paymentRoutes)],
    exports: [RouterModule]
})

export class PaymentRoutingModule {}