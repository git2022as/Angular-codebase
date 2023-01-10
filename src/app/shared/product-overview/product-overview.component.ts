import { Component, OnInit, Input } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { CommonService } from 'src/app/services/common.service';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataService } from 'src/app/services/data.service';
import { ProductAddOnComponent } from '../product-add-on/product-add-on.component';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { StaticMsg } from 'src/app/constants/constant';

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
              private bsModalService: BsModalService,
              private router: Router,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.availableForcart = this.utilityService.checkDishInCart(this.product);
    this.subscribeDataService();
  }

  subscribeDataService(): void{
    this.dataService.UPDATED_DISH.subscribe((res: boolean)=>{
      if(res)
      this.availableForcart = this.utilityService.checkDishInCart(this.product);
    })
  }

  addToCart(product: any): void{
    if(this.appCacheService._loggedInUser){
      //code for ADD-ON items
      this.bsModalRef = this.openAddOn(product.dishPrice);
      this.bsModalRef.content.AddOnEvent.subscribe((res: any) => {
        //code for add to cart after 
        this.bsModalRef.hide();
        let cartObject = {
          "quantity": 1,
          "addOn": res.addOn,
          "tprice": res.total,
          "itemId": product.id
        }
        this.appCacheService._cartDetails.push(cartObject);
        this.dataService.UPDATE_CART_COUNT.next(true);
        this.availableForcart = false;
      });
    }
    else{
      //show error modal
      const errorMsg = StaticMsg.withoutLoginNoCartAccess;
      this.commonService.openErrorModal(errorMsg);
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
      const content = StaticMsg.removeFromCartConfirmation;
      const title = StaticMsg.removeFromCartTitle;
      this.bsModalRef = this.commonService.openConfirmationModal(content,title);
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

  viewDetails(product: any): void{
    this.router.navigate(['dish/' + product.id]);
  }

}
