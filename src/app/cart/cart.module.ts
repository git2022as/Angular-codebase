import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule} from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatIconModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { DirectiveModule } from '../directives/directives.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, 
            CartRoutingModule, 
            SharedModule,
            TooltipModule.forRoot(),
            MatIconModule,
            MatRadioModule,
            FormsModule,
            MatButtonModule,
            MatInputModule,
            DirectiveModule
          ],
  exports: [CartComponent]
})
export class CartModule {}
