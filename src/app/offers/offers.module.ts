import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OffersComponent } from './offers.component';
import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
    declarations: [
        OffersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        OffersRoutingModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports:[
        OffersComponent
    ]
})

export class OffersModule {}