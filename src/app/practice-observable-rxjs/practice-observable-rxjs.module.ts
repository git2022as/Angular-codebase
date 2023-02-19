import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeObservableRxjsComponent } from './practice-observable-rxjs.component';
import { PracticeObservableRxjsRoutingModule } from './practice-observable-rxjs-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DirectiveModule } from '../directives/directives.module';

@NgModule({
    declarations: [PracticeObservableRxjsComponent],
    imports: [
        CommonModule,
        PracticeObservableRxjsRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        DirectiveModule
    ],
    exports: [
        PracticeObservableRxjsComponent
    ]
})

export class PracticeObservableRxjsModule {}