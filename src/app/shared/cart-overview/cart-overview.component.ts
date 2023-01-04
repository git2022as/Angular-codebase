import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticMsg } from 'src/app/constants/message.constant';
import { IndividualCartPipe } from 'src/app/pipes/individual-cart.pipe';
import { DataService } from 'src/app/services/data.service';
import { staticValue } from 'src/app/model/model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';
import { AppCacheService } from 'src/app/services/app.cache.service';

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
              private dataService: DataService,
              private bsModalRef: BsModalRef,
              private bsModalService: BsModalService,
              private commonService: CommonService,
              private appCacheService: AppCacheService) { }

  ngOnInit(): void {
    
  }

  addItem(cart: any): void{
    cart.quantity ++;
    if(cart.quantity > staticValue.maxQuantityInCart){
      cart.quantity = staticValue.maxQuantityInCart;
      this.openMessage(StaticMsg.addQuantity);
    }
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.dataService.UPDATED_CART.next(this.cartDetails);
    console.log(this.cartDetails);
  }

  removeItem(cart: any): void{
    cart.quantity --;
    if(cart.quantity < staticValue.minQuantityInCart){
      cart.quantity = staticValue.minQuantityInCart;
      this.openMessage(StaticMsg.removeQuantity);
    }
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.dataService.UPDATED_CART.next(this.cartDetails);
    console.log(this.cartDetails);
  }

  addExtraCheckbox(cart: any): void{
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.dataService.UPDATED_CART.next(this.cartDetails);
  }

  openMessage(msg: string) {
    this.cartAddRemoveEvent.emit({message: msg});
  }

  delteDish(cart: any): void{
    const initialState: ModalOptions = {
      initialState: {
        content: 'Are you sure want to remove this item from cart?',
        title: 'Remove From Cart',
        type: 'confirmation',
        data: 'para',
        secondaryButton: true,
        primaryButtonText: 'Yes'
      },
    }
    this.bsModalRef = this.commonService.openStaticModal(initialState);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //User clicked delete cart option
      this.bsModalRef.hide();
      let ind = 0;
      this.appCacheService._cartDetails.forEach((each, index) =>{
        if(each.itemId == cart.itemId)
          ind = index;
      });
      this.appCacheService._cartDetails.splice(ind,1);
      this.dataService.UPDATED_CART.next(this.cartDetails);
      this.dataService.UPDATE_CART_COUNT.next(true);
    });
  }

}
