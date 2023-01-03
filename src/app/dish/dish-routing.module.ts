import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DishComponent } from "./dish.component";

const dishRoute : Routes = [
    {
        path: '',
        component: DishComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(dishRoute)],
    exports: [RouterModule]
})

export class DishRoutingModule {}