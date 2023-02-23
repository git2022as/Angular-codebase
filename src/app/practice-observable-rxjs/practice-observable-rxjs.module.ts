import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeObservableRxjsComponent } from './practice-observable-rxjs.component';
import { PracticeObservableRxjsRoutingModule } from './practice-observable-rxjs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectiveModule } from '../directives/directives.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [PracticeObservableRxjsComponent],
    imports: [
        CommonModule,
        PracticeObservableRxjsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        DirectiveModule,
        MatIconModule
    ],
    exports: [
        PracticeObservableRxjsComponent
    ]
})

export class PracticeObservableRxjsModule {}