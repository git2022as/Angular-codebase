import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeObservableRxjsComponent } from './practice-observable-rxjs.component';

const PracticeObservableRxjsRoutes : Routes = [
    {
        path: '',
        component: PracticeObservableRxjsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(PracticeObservableRxjsRoutes)],
    exports: [RouterModule]
})

export class PracticeObservableRxjsRoutingModule {}