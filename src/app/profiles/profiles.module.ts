import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilesComponent } from "./profiles.component";
import { ProfilesRoutingModule } from "./profile-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { SharedModule} from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatIconModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { DirectiveModule } from "../directives/directives.module";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        ProfilesComponent
    ],
    imports: [
        CommonModule, 
        ProfilesRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        SharedModule,
        TooltipModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        DirectiveModule
    ],
    exports: [
        ProfilesComponent
    ]
})

export class ProfilesModule {}