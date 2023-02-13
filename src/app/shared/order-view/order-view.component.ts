import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {

  @Input() orders: any;
  @Input() productDetails: any;
  @Input() editMode: boolean = false;
  @Output() editOrderEvent = new EventEmitter<any>();

  constructor(public appCacheService: AppCacheService) {}

  editOrder(order: any){
    this.editOrderEvent.emit(order);
  }

}
