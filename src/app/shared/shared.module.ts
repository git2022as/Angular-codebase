import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpModalComponent } from './sign-up/signUp-modal.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { BranchesComponent } from './branches/branches.component';
import { StaticDialogNgxBootstrapComponent } from './static-dialog-material/static-dialog-ngxBootstrap.component';
import { OffersDetailsComponent } from './offers-details/offers-details.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
/* pipe module */
import { PipeModule } from '../pipes/pipe.module';
/* ngx-bootstrap modal*/
import { ModalModule } from 'ngx-bootstrap/modal';
/* material modules */
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SignUpModalComponent,
    ProductOverviewComponent,
    BranchesComponent,
    StaticDialogNgxBootstrapComponent,
    OffersDetailsComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ModalModule.forRoot(),
    MatIconModule,
    PipeModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignUpModalComponent,
    ProductOverviewComponent,
    BranchesComponent,
    StaticDialogNgxBootstrapComponent,
    OffersDetailsComponent,
    LoginModalComponent
  ]
})

export class SharedModule { }
