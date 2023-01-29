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
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirectiveModule } from "../directives/directives.module";

/* ngx-modules */
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AdminOrdersEntryComponent } from './admin-orders-entry/admin-orders-entry.component';

@NgModule({
    declarations: [
        AdminComponent, 
        AdminBranchesEntryComponent, 
        AdminCouponsEntryComponent,
        AdminDishEntryComponent,
        AdminOffersEntryComponent,
        AdminSlidesEntryComponent,
        AdminDashboardComponent,
        AdminOrdersEntryComponent
    ],
    exports: [
        AdminComponent, 
        AdminBranchesEntryComponent,
        AdminCouponsEntryComponent,
        AdminDishEntryComponent,
        AdminOffersEntryComponent,
        AdminSlidesEntryComponent,
        AdminOrdersEntryComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        TabsModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        TooltipModule.forRoot(),
        HttpClientModule,
        SharedModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        DirectiveModule
    ]
})

export class AdminModule {}