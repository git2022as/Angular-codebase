import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const cartRoutes: Routes = [
    {
        path: '',
        component: CartComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(cartRoutes)],
    exports: [RouterModule]
})

export class CartRoutingModule {}