import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BaseComponent } from './base/base.component';
import { OffersComponent } from './offers/offers.component';

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
    path: 'base',
    loadChildren: () => import('./base/base.module').then((a) => a.BaseModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about/about.module').then((a) => a.AboutModule),
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./offers/offers.module').then((a) => a.OffersModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((a) => a.CartModule),
  },
  {
    path: 'dish/:id',
    loadChildren: () => import('./dish/dish.module').then((a)=>a.DishModule)
  },
  { path: '', redirectTo: 'base', pathMatch: 'full' },
  { path: '**', redirectTo: 'base' },
];

@NgModule({
  imports: [RouterModule.forRoot(lazyRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
