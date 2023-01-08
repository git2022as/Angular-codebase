import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeObservableRxjsComponent } from './practice-observable-rxjs.component';
import { PracticeObservableRxjsRoutingModule } from './practice-observable-rxjs-routing.module';

@NgModule({
    declarations: [PracticeObservableRxjsComponent],
    imports: [
        CommonModule,
        PracticeObservableRxjsRoutingModule
    ],
    exports: [
        PracticeObservableRxjsComponent
    ]
})

export class PracticeObservableRxjsModule {}