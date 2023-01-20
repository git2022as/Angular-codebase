import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from '../../interface/project.interface';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg } from 'src/app/constants/constant';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { staticValue } from 'src/app/constants/constant';

@Component({
  selector: 'app-admin-coupons-entry',
  templateUrl: './admin-coupons-entry.component.html',
  styleUrls: ['./admin-coupons-entry.component.scss']
})
export class AdminCouponsEntryComponent implements OnInit, OnDestroy, deactivateInterface {

  couponCode: string;
  couponDescription: string;
  couponDiscountMethod: string;
  couponDiscount: number = null;
  addCouponsSubscriptiton: Subscription | undefined;
  updateCouponsSubscription: Subscription | undefined;
  deleteCouponsSubscription: Subscription | undefined;
  editMode: boolean = false;
  buttonText: string = "Continue";
  coupons: Array<any>;
  selectedID: string = "";
  couponsHeader = ["Coupon Code", "Coupon Type", "Actions"];
  paginationCoupon : Array<any> = [];
  updatedItemsPerPage: number = staticValue.paginationPerPageConstant;
  filterdCoupon: Array<any>;
  filterText: string = "";

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("couponsForm", {read: NgForm}) couponsForm: any;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef,
              private filterPipe: FilterPipe) { }

  ngOnInit(): void {
    this.getCoupons();
  }

  canExit(): boolean{
    if(this.couponsForm.form.valid || this.couponsForm.form.dirty){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
  }

  _tableSortEvent(event: {headerName: string,type: boolean}): void{
    let product = [];
    product = [...this.filterdCoupon];
    product.sort((a,b)=>{return event.type ? a[event.headerName].localeCompare(b[event.headerName]) : b[event.headerName].localeCompare(a[event.headerName])});
    this.filterdCoupon = [...product];
    this.paginationCoupon = this.commonService.loadPagination(this.filterdCoupon, this.updatedItemsPerPage);
  }

  _searchTextEvent(event: {searchText: string}): void{
    let filterdData = [];
    this.filterText = event.searchText;
    if(this.filterText == ''){
      this.filterdCoupon = [...this.coupons];
    }
    else{
      this.filterdCoupon = this.filterPipe.transform(this.coupons,this.filterText);
    }
    this.paginationCoupon = this.commonService.loadPagination(this.filterdCoupon, this.updatedItemsPerPage);
  }

  getCoupons(){
    this.adminService.getCoupons().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.coupons = res;
      this.filterdCoupon = [...this.coupons]
      this.paginationCoupon = this.commonService.loadPagination(this.filterdCoupon);
    }));
  }

  _perPageSelectionChanged(value: number): void{
    this.updatedItemsPerPage = value;
    this.paginationCoupon = this.commonService.loadPagination(this.filterdCoupon, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.updatedItemsPerPage = event.perPageSelection;
    this.paginationCoupon = this.commonService.loadPagination(this.filterdCoupon, event.perPageSelection, event.currentPage);
  }

  editCoupon(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
    this.updateBlankForm(each);
  }

  updateBlankForm(each: any): void{
    this.couponCode = each.couponCode;
    this.couponDescription = each.couponDescription;
    this.couponDiscountMethod = each.couponDiscountMethod;
    this.couponDiscount = each.couponDiscount;
  }

  deleteCoupon(each: any): void{
    const content = StaticMsg.deleteItemConfirmationText;
    const title = StaticMsg.deleteItemConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //when user confirms, call delete functionality
      this.deleteCouponsSubscription = this.adminService.deleteCoupon(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = "coupon has been deleted";
        const color = 'green';
        this.showShortMsg(msg,color);
        this.getCoupons();
      },
      (error: any)=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    });
  }

  couponsFormSubmit(couponsForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      if(!couponsForm.dirty){
        const msg = "It seems, you haven't changed any value yet";
        const color = 'orange';
        this.showShortMsg(msg,color);
        return;
      }
      this.updateCouponsSubscription = this.adminService.updateCoupons(this.selectedID,couponsForm.value).subscribe((data: any)=>{
        const msg = "coupon has been updated";
        const color = 'green';
        this.showShortMsg(msg,color);
        this.editMode = false;
        this.buttonText = "Continue";
        this.selectedID = "";
        this.couponsFormReset(couponsForm);
        this.getCoupons();
      },
      error=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    }
    else{
      if(!this.commonService.checkDuplicate(couponsForm.value.couponCode,this.coupons,'couponCode')){
        console.log(couponsForm.value);
        this.addCouponsSubscriptiton = this.adminService.addCoupons(couponsForm.value).subscribe((res: any)=>{
          this.getCoupons();
          const msg = "coupon has been added";
          const color = 'green';
          this.showShortMsg(msg,color);
          this.couponsFormReset(couponsForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg('Duplicate coupon, please add a new coupon.','red');
      }
    }
  }

  couponsFormReset(slidesForm: NgForm): void{
    slidesForm.resetForm();
    this.editMode = false;
    this.selectedID = "";
    this.buttonText = "Continue";
  }

  showShortMsg(msg: string, color: string): void{
    const componentRef = this.shortContainer.createComponent(ShortMessageComponent);
    componentRef.instance.message = msg;
    componentRef.instance.color = color;
    componentRef.instance.parent = this.getParent();
  }

  getParent(): any{
    return {
      callParentMethod: () => {
        this.removeShortMsg();
      }
    }
  }

  removeShortMsg(): void{
    this.shortContainer.clear();
  }

  ngOnDestroy(): void {
    this.addCouponsSubscriptiton?.unsubscribe();
    this.updateCouponsSubscription?.unsubscribe();
    this.deleteCouponsSubscription?.unsubscribe();
  }

}
