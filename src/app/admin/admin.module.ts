import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule } from "@angular/forms";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminBranchesEntryComponent } from "./admin-branches-entry/admin-branches-entry.component";
import { AdminCouponsEntryComponent } from "./admin-coupons-entry/admin-coupons-entry.component";
import { AdminDishEntryComponent } from "./admin-dish-entry/admin-dish-entry.component";
import { AdminOffersEntryComponent } from "./admin-offers-entry/admin-offers-entry.component";
import { AdminSlidesEntryComponent } from "./admin-slides-entry/admin-slides-entry.component";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        AdminComponent, 
        AdminBranchesEntryComponent, 
        AdminCouponsEntryComponent,
        AdminDishEntryComponent,
        AdminOffersEntryComponent,
        AdminSlidesEntryComponent,
        AdminDashboardComponent
    ],
    exports: [
        AdminComponent, 
        AdminBranchesEntryComponent,
        AdminCouponsEntryComponent,
        AdminDishEntryComponent,
        AdminOffersEntryComponent,
        AdminSlidesEntryComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        TabsModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatInputModule
    ]
})

export class AdminModule {}