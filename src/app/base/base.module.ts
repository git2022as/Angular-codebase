import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
    declarations: [
        BaseComponent
    ],
    imports: [
        CarouselModule.forRoot(), 
        SharedModule,
        ModalModule.forRoot(),
        BaseRoutingModule,
        CommonModule
    ],
    exports: [
        BaseComponent
    ],
    providers: []
})

export class BaseModule { }