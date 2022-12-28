import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BaseModule } from '../base/base.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { OffersModule } from '../offers/offers.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatBadgeModule } from '@angular/material/badge';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        BaseModule,
        FooterModule,
        RouterModule,
        OffersModule,
        ModalModule.forChild(),
        MatBadgeModule,
        TooltipModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class HeaderModule {}