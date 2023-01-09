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
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import { ShortMessageComponent } from './short-message/short-message.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { IndividualCartPipe } from '../pipes/individual-cart.pipe';
import { ProductAddOnComponent } from './product-add-on/product-add-on.component';
import { NoItemsComponent } from './no-items/no-items.component';
import { CalorieChartComponent } from './calorie-chart/calorie-chart.component';
import { AvailabilityCheckComponent } from './availability-check/availability-check.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { AdminLoginModalComponent } from './admin-login-modal/admin-login-modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
/* pipe module */
import { PipeModule } from '../pipes/pipe.module';
/* ngx-bootstrap modal*/
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
/* material modules */
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    SignUpModalComponent,
    ProductOverviewComponent,
    BranchesComponent,
    StaticDialogNgxBootstrapComponent,
    OffersDetailsComponent,
    LoginModalComponent,
    CartOverviewComponent,
    ShortMessageComponent,
    SocialMediaComponent,
    ProductAddOnComponent,
    NoItemsComponent,
    CalorieChartComponent,
    AvailabilityCheckComponent,
    ReviewsComponent,
    PageNotFoundComponent,
    GoToTopComponent,
    AdminLoginModalComponent,
    SpinnerComponent
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
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    SignUpModalComponent,
    ProductOverviewComponent,
    BranchesComponent,
    StaticDialogNgxBootstrapComponent,
    OffersDetailsComponent,
    LoginModalComponent,
    CartOverviewComponent,
    ShortMessageComponent,
    SocialMediaComponent,
    ProductAddOnComponent,
    NoItemsComponent,
    CalorieChartComponent,
    AvailabilityCheckComponent,
    ReviewsComponent,
    PageNotFoundComponent,
    GoToTopComponent,
    AdminLoginModalComponent,
    SpinnerComponent
  ],
  providers: [IndividualCartPipe]
})

export class SharedModule { }
