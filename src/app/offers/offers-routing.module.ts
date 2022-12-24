import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';

const offersRoutes: Routes = [
    {
        'path': '',
        'component': OffersComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(offersRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class OffersRoutingModule {}