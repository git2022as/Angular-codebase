import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticMsg } from 'src/app/constants/message.constant';
import { IndividualCartPipe } from 'src/app/pipes/individual-cart.pipe';
import { DataService } from 'src/app/services/data.service';
import { staticValue } from 'src/app/model/model';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {

  @Input() cartDetails: any;
  @Input() productDetails: any;
  durationStaysInSeconds = 5000;

  @Output() cartAddRemoveEvent = new EventEmitter<any>();
  @Output() cartTotalEvent = new EventEmitter<any>();

  /*Example of using custom pipe in component*/
  constructor(private individualCartPipe: IndividualCartPipe,
              private dataService: DataService) { }

  ngOnInit(): void {
    
  }

  addItem(itemID: number, index: number): void{
    this.cartDetails[index].quantity ++;
    if(this.cartDetails[index].quantity > staticValue.maxQuantityInCart){
      this.cartDetails[index].quantity = staticValue.maxQuantityInCart;
      this.openMessage(StaticMsg.addQuantity);
    }
    this.cartDetails[index].tprice = this.individualCartPipe.transform(itemID, this.productDetails, this.cartDetails[index].quantity);
    this.dataService.UPDATED_CART.next(this.cartDetails);
    console.log(this.cartDetails);
  }

  removeItem(itemID: number, index: number): void{
    this.cartDetails[index].quantity --;
    if(this.cartDetails[index].quantity < staticValue.minQuantityInCart){
      this.cartDetails[index].quantity = staticValue.minQuantityInCart;
      this.openMessage(StaticMsg.removeQuantity);
    }
    this.cartDetails[index].tprice = this.individualCartPipe.transform(itemID, this.productDetails, this.cartDetails[index].quantity);
    this.dataService.UPDATED_CART.next(this.cartDetails);
    console.log(this.cartDetails);
  }

  openMessage(msg: string) {
    this.cartAddRemoveEvent.emit({message: msg});
  }

}
