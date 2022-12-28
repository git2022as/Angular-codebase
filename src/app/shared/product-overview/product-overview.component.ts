import { Component, OnInit, Input } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { CommonService } from 'src/app/services/common.service';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { ProductAddOnComponent } from '../product-add-on/product-add-on.component';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  @Input() product: any;
  availableForcart : boolean = true;

  constructor(public appCacheService: AppCacheService,
              private commonService: CommonService,
              private dataService: DataService,
              public bsModalRef: BsModalRef,
              private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.checkDishInCart();
    this.subscribeDataService();
  }

  checkDishInCart(): void{
    if(this.appCacheService._cartDetails.length == 0)
      this.availableForcart = true;
    else{
      this.appCacheService._cartDetails.find(each => {
        if(each.itemId == this.product.itemId)
          this.availableForcart = false;
      })
    }
  }

  subscribeDataService(): void{
    this.dataService.UPDATED_DISH.subscribe((res: boolean)=>{
      if(res)
        this.checkDishInCart();
    })
  }

  addToCart(product: any): void{
    if(this.appCacheService._loggedInUser){
      //code for ADD-ON items
      this.bsModalRef = this.openAddOn(product.price);
      this.bsModalRef.content.AddOnEvent.subscribe((res: any) => {
        //code for add to cart after 
        this.bsModalRef.hide();
        let cartObject = {
          "quantity": 1,
          "addOn": res.addOn,
          "tprice": res.total,
          "itemId": product.itemId
        }
        this.appCacheService._cartDetails.push(cartObject);
        this.dataService.UPDATE_CART_COUNT.next(true);
        this.availableForcart = false;
      });
    }
    else{
      const initialState: ModalOptions = {
        initialState: {
          content: 'Please login first to add this dish in the cart.',
          title: 'Error',
          type: 'error',
          data: 'para',
          primaryButtonText: 'Ok',
        },
      }
      this.bsModalRef = this.commonService.openStaticModal(initialState);
    }
  }

  openAddOn(price): any{
    const initialState: ModalOptions = {
      initialState: {
        EachItemPrice: price,
        title: 'Add-On Items',
      },
    }
    return this.bsModalService.show(ProductAddOnComponent,initialState);
  }

  removeFromCart(product: any){
    if(this.appCacheService._loggedInUser){
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
        //User clicked remove cart option
        this.bsModalRef.hide();
        let ind = 0;
        this.appCacheService._cartDetails.forEach((each, index) =>{
          if(each.itemId == product.itemId)
            ind = index;
        });
        this.appCacheService._cartDetails.splice(ind,1);
        this.dataService.UPDATE_CART_COUNT.next(true);
        this.availableForcart = true;
      });
    }
  }

}
