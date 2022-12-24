import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../base/base.component';

const offersRoutes: Routes = [
    {
        'path': '',
        'component': BaseComponent
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

export class BaseRoutingModule {}