import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { MatAccordion } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductAddOnComponent } from '../shared/product-add-on/product-add-on.component';
import { DataService } from 'src/app/services/data.service';
import { UtilityService } from '../services/utility.service';
import { StaticMsg } from '../constants/constant';
import { AuthService } from '../services/auth.service';

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
              private utilityService: UtilityService,
              private authService: AuthService
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
    details = pro.find(res => {
      return res.id == id
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
      this.bsModalRef = this.openAddOn(productDetails.dishPrice);
      this.bsModalRef.content.AddOnEvent.subscribe((res: any) => {
        //code for add to cart after 
        this.bsModalRef.hide();
        let cartObject = {
          "quantity": 1,
          "addOn": res.addOn,
          "tprice": res.total,
          "id": productDetails.id
        }
        const uid = this.appCacheService.UID;
        if(uid != ""){
          this.authService.addToCart(uid, cartObject).subscribe((res: any)=>{
            if(res){
              console.log("data after add to cart " + res);
              const updatedCartObject = {cartID: res.name, ...cartObject};
              this.appCacheService._cartDetails.push(updatedCartObject);
              this.appCacheService.addCartToLocalStorage();
              this.dataService.UPDATE_CART_COUNT.next(true);
              this.availableIncart = false;
            }
          });
        }
        else{
          //show error when UID is missing
          //show error modal
          const errorMsg = StaticMsg.uidMissingError;
          this.commonService.openErrorModal(errorMsg);
        }
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

  removeFromCart(productDetails: any){
    if(this.appCacheService._loggedInUser){
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
          if(each.id == productDetails.id){
            ind = index;
            cartID = each.cartID;
          }
        });
        if(uid != ""){
          this.authService.deleteDishFromCart(uid, cartID).subscribe((res: any)=>{
            console.log("remove from cart API " + res);
            this.appCacheService._cartDetails.splice(ind,1);
            this.appCacheService.addCartToLocalStorage();
            this.dataService.UPDATE_CART_COUNT.next(true);
            this.availableIncart = true;
          });
        }
        else{
          //show error when UID is missing
          //show error modal
          const errorMsg = StaticMsg.uidMissingError;
          this.commonService.openErrorModal(errorMsg);
        }
        this.bsModalRef.hide();
      });
    }
  }

}
