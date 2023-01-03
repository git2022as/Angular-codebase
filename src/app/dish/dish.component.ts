import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { MatAccordion } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductAddOnComponent } from '../shared/product-add-on/product-add-on.component';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  id: any;
  productDetails: any;
  @ViewChild(MatAccordion) accordion : MatAccordion;
  showIngradient: boolean = true;
  showAvailability: boolean = false;
  showReviews: boolean = false;
  availableIncart: boolean = true;

  constructor(private route: ActivatedRoute,
              private appCacheService: AppCacheService,
              private commonService: CommonService,
              public bsModalRef: BsModalRef,
              private bsModalService: BsModalService,
              private dataService: DataService,
              private utilityService: UtilityService
              ) { }

  ngOnInit(): void {
    this.getProductID();
    this.productDetails = this.getProductDetails(this.id);
    this.availableIncart = this.utilityService.checkDishInCart(this.productDetails);
    this.subscribeDataService();
  }

  subscribeDataService(): void{
    this.dataService.UPDATED_DISH.subscribe((res: boolean)=>{
      if(res)
      this.availableIncart = this.utilityService.checkDishInCart(this.productDetails);
    })
  }

  getProductID(): any{
    this.route.paramMap.subscribe(data => {
      this.id = data.get('id');
    })
  }

  getProductDetails(id): any{
    let details = {};
    const pro = this.appCacheService._dishesDetails;
    pro.forEach(res => {
      if(res.itemId == Number(id))
        details = res;
    });
    return details;
  }

  doNothing(event: any): void{
    event.preventDefault();
  }

  openSection(sec: string): void{
    this.showAvailability = this.showIngradient = this.showReviews = false;
    if(sec == 'ingradient')
      this.showIngradient = true;
    else if(sec == 'availability')
      this.showAvailability = true;
    else
      this.showReviews = true;
  }

  addToCart(productDetails: any): void{
    if(this.appCacheService._loggedInUser){
      //code for ADD-ON items
      this.bsModalRef = this.openAddOn(productDetails.price);
      this.bsModalRef.content.AddOnEvent.subscribe((res: any) => {
        //code for add to cart after 
        this.bsModalRef.hide();
        let cartObject = {
          "quantity": 1,
          "addOn": res.addOn,
          "tprice": res.total,
          "itemId": productDetails.itemId
        }
        this.appCacheService._cartDetails.push(cartObject);
        this.dataService.UPDATE_CART_COUNT.next(true);
        this.availableIncart = false;
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

  removeFromCart(productDetails: any){
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
          if(each.itemId == productDetails.itemId)
            ind = index;
        });
        this.appCacheService._cartDetails.splice(ind,1);
        this.dataService.UPDATE_CART_COUNT.next(true);
        this.availableIncart = true;
      });
    }
  }

}
