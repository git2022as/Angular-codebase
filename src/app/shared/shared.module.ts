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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { OrderViewComponent } from './order-view/order-view.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { OrderStatusChangeComponent } from './order-status-change/order-status-change.component';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { ChildDropdownComponentComponent } from './child-dropdown-component/child-dropdown-component.component';
import { DirectiveModule } from '../directives/directives.module';
import { ChildDatepickerComponentComponent } from './child-datepicker-component/child-datepicker-component.component';
import { ChildTextareaComponentComponent } from './child-textarea-component/child-textarea-component.component';
import { ChildTableComponentComponent } from './child-table-component/child-table-component.component';
import { ChildErrorComponentComponent } from './child-error-component/child-error-component.component';
import { ChildMultidropdownComponentComponent } from './child-multidropdown-component/child-multidropdown-component.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    SpinnerComponent,
    ForgotPasswordComponent,
    PaginationComponent,
    AdminTableComponent,
    BreadcrumbComponent,
    SearchComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    OrderViewComponent,
    OrderStatusChangeComponent,
    GoogleMapComponent,
    ChildComponentComponent,
    ChildDropdownComponentComponent,
    ChildDatepickerComponentComponent,
    ChildTextareaComponentComponent,
    ChildTableComponentComponent,
    ChildErrorComponentComponent,
    ChildMultidropdownComponentComponent
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
    MatCheckboxModule,
    MatSelectModule,
    MatProgressBarModule,
    RouterModule,
    GoogleMapsModule,
    DirectiveModule,
    NgMultiSelectDropDownModule.forRoot()
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
    SpinnerComponent,
    ForgotPasswordComponent,
    PaginationComponent,
    AdminTableComponent,
    BreadcrumbComponent,
    SearchComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    OrderViewComponent,
    OrderStatusChangeComponent,
    GoogleMapComponent,
    ChildComponentComponent,
    ChildDropdownComponentComponent,
    ChildDatepickerComponentComponent,
    ChildTextareaComponentComponent,
    ChildTableComponentComponent,
    ChildErrorComponentComponent,
    ChildMultidropdownComponentComponent
  ],
  providers: [IndividualCartPipe, FilterPipe]
})

export class SharedModule { }
