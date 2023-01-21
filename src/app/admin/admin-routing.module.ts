import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminCanDeactivateGuardService } from "../guard/adminCanDeactivate.guard";
import { AdminBranchesEntryComponent } from "./admin-branches-entry/admin-branches-entry.component";
import { AdminCouponsEntryComponent } from "./admin-coupons-entry/admin-coupons-entry.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminDishEntryComponent } from "./admin-dish-entry/admin-dish-entry.component";
import { AdminOffersEntryComponent } from "./admin-offers-entry/admin-offers-entry.component";
import { AdminSlidesEntryComponent } from "./admin-slides-entry/admin-slides-entry.component";
import { AdminComponent } from "./admin.component";

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'dashboard',
                component: AdminDashboardComponent
            },
            {
                path: 'dishes',
                component: AdminDishEntryComponent,
                canDeactivate: [AdminCanDeactivateGuardService]
            },
            {
                path: 'offers',
                component: AdminOffersEntryComponent,
                canDeactivate: [AdminCanDeactivateGuardService]
            },
            {
                path: 'slides',
                component: AdminSlidesEntryComponent,
                canDeactivate: [AdminCanDeactivateGuardService]
            },
            {
                path: 'coupons',
                component: AdminCouponsEntryComponent,
                canDeactivate: [AdminCanDeactivateGuardService]
            },
            {
                path: 'branches',
                component: AdminBranchesEntryComponent,
                canDeactivate: [AdminCanDeactivateGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}