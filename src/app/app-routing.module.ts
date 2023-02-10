import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BaseComponent } from './base/base.component';
import { LoginAuthCanActivateGuardService } from './guard/loginAuthCanActivate.guard';
import { OffersComponent } from './offers/offers.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminCanDeactivateGuardService } from './guard/adminCanDeactivate.guard';
import { PaymentModuleAuthenticationGuardService } from './guard/paymentModuleAuthenticationCanActivate.guard';
import { ContentResolveGuardService } from './guard/contentResolve.guard';
import { LayoutComponent } from './layout/layout.component';

//example of normal routing
/*const routes: Routes = [
  {path: 'base', component: BaseComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'offers', component: OffersComponent},
  {path: '', pathMatch: 'full', redirectTo: 'base'},
  {path: '**', redirectTo: 'base'},//error scenario
];*/

//example of lazy loading
const lazyRoutes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    resolve: { content: ContentResolveGuardService },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./base/base.module').then((a) => a.BaseModule)
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./about/about.module').then((a) => a.AboutModule)
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('./offers/offers.module').then(a => a.OffersModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(a => a.CartModule),
        canActivate: [LoginAuthCanActivateGuardService]
      },
      {
        path: 'dish/:id',
        loadChildren: () => import('./dish/dish.module').then(a=>a.DishModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(a => a.PaymentModule),
        canActivate: [PaymentModuleAuthenticationGuardService]
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
      },
      {
        path: 'practice',
        loadChildren: () => import('./practice-observable-rxjs/practice-observable-rxjs.module').then(a => a.PracticeObservableRxjsModule)
      },
      {
        path: 'profiles',
        loadChildren: () => import('./profiles/profiles.module').then(a => a.ProfilesModule)
      },
      {
        path: 'orders',
        loadChildren: ()=> import('../app/orders/orders.module').then(a => a.OrdersModule),
        canActivate: [LoginAuthCanActivateGuardService]
      },
    ]
  },  
  { 
    path: '', 
    redirectTo: 'layout/base', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent  
  }//this will show the error page & it should be present at the bottom
];

@NgModule({
  imports: [RouterModule.forRoot(lazyRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
