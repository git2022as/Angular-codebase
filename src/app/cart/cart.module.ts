import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart.component';
import {CartRoutingModule} from './cart-routing.module';
import {SharedModule} from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatIconModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, 
            CartRoutingModule, 
            SharedModule,
            TooltipModule.forRoot(),
            MatIconModule,
            MatRadioModule,
            FormsModule
          ],
  exports: [CartComponent]
})
export class CartModule {}
