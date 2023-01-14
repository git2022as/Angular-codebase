import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DishComponent } from "./dish.component";
import { DishRoutingModule } from "./dish-routing.module";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule} from '@angular/material/list';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        DishComponent
    ],
    imports: [
        CommonModule,
        DishRoutingModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatListModule,
        SharedModule,
        HttpClientModule
    ],
    exports: [
        DishComponent
    ]
})

export class DishModule {}