import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndividualCartPipe } from 'src/app/pipes/individual-cart.pipe';
import { DataService } from 'src/app/services/data.service';
import { staticValue, StaticMsg } from 'src/app/constants/constant';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { AuthService } from 'src/app/services/auth.service';

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
              private appCacheService: AppCacheService,
              private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  addItem(cart: any): void{
    cart.quantity ++;
    if(cart.quantity > staticValue.maxQuantityInCart){
      cart.quantity = staticValue.maxQuantityInCart;
      this.openMessage(StaticMsg.addQuantity);
    }
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.updateCartInDB(cart);
  }

  removeItem(cart: any): void{
    cart.quantity --;
    if(cart.quantity < staticValue.minQuantityInCart){
      cart.quantity = staticValue.minQuantityInCart;
      this.openMessage(StaticMsg.removeQuantity);
    }
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.updateCartInDB(cart);
  }

  updateCartInDB(cart: any): void{
    const uid = this.appCacheService.UID;
    this.authService.updateDishOnCart(uid, cart.cartID, cart).subscribe((res: any)=>{
      if(res){
        console.log("cart has been updated " + res);
        this.dataService.UPDATED_CART.next(this.cartDetails);
      }
    });
  }

  addExtraCheckbox(cart: any): void{
    cart.tprice = this.individualCartPipe.transform(cart, this.productDetails);
    this.dataService.UPDATED_CART.next(this.cartDetails);
  }

  openMessage(msg: string) {
    this.cartAddRemoveEvent.emit({message: msg});
  }

  delteDish(cart: any): void{
    const content = StaticMsg.removeFromCartConfirmation;
    const title = StaticMsg.removeFromCartTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //User clicked remove cart option
      //call CART API DELETE OPERATION
      const uid = this.appCacheService.UID;
      let ind = 0;
      let cartID;
      this.appCacheService._cartDetails.forEach((each, index) =>{
        if(each.id == cart.id)
          ind = index;
          cartID = cart.cartID;
      });
      this.authService.deleteDishFromCart(uid, cartID).subscribe((res: any)=>{
        console.log("remove from cart API " + res);
        this.appCacheService._cartDetails.splice(ind,1);
        this.dataService.UPDATED_CART.next(true);
        this.dataService.UPDATE_CART_COUNT.next(true);
      });
      this.bsModalRef.hide();
    });
  }

}
