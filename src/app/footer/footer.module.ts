import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        SharedModule,
        ModalModule
    ],
    exports: [
        FooterComponent
    ]
})

export class FooterModule {}