import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { cartExtraItem } from '../../model/model';
import { StaticMsg } from 'src/app/constants/message.constant';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {

  @Input() cart: any;
  productQuantity: number = 1;
  cartValueAdd: any = cartExtraItem;
  durationStaysInSeconds = 5000;

  @Output() cartAddRemoveEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void{
    this.productQuantity ++;
    if(this.productQuantity > 5){
      this.productQuantity = 5;
      this.openMessage(StaticMsg.addQuantity);
    }
  }

  removeItem(): void{
    this.productQuantity --;
    if(this.productQuantity < 1){
      this.productQuantity = 1;
      this.openMessage(StaticMsg.removeQuantity);
    }
  }

  openMessage(msg: string) {
    this.cartAddRemoveEvent.emit({message: msg});
  }

}
