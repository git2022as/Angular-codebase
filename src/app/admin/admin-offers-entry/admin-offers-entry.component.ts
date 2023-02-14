import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface, offersSubSectionInterface } from '../../interface/project.interface';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg, offerSubSections, errorMessages, admin_headers } from 'src/app/constants/constant';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { staticValue } from 'src/app/constants/constant';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-admin-offers-entry',
  templateUrl: './admin-offers-entry.component.html',
  styleUrls: ['./admin-offers-entry.component.scss']
})
export class AdminOffersEntryComponent implements OnInit, OnDestroy, deactivateInterface {

  offerCode: string;
  minimumOrderValue: number = null;
  offerSection: string;
  offerSubSection: Array<any> = [];
  offeredBy: string;
  discount: number = null;
  addOffersSubscriptiton: Subscription | undefined;
  updateOffersSubscription: Subscription | undefined;
  deleteOffersSubscription: Subscription | undefined;
  editMode: boolean = false;
  buttonText: string = "Continue";
  offers: Array<any>;
  selectedID: string = "";
  offersHeader = admin_headers.offer;
  paginationOffer : Array<any> = [];
  updatedItemsPerPage: number = staticValue.paginationPerPageConstant;
  filterOffers: Array<any>;
  filterText: string = "";
  errorMessages = errorMessages;

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("offerForm", {read: NgForm}) offerForm: any;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef,
              private filterPipe: FilterPipe,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.createOfferSubSec();
    this.getOffers();
  }

  createOfferSubSec(){
    offerSubSections.forEach(each=>{
      let details : offersSubSectionInterface = {
        subSectionValue: true,
        subSectionText: each
      };
      this.offerSubSection.push(details);
    })
  }

  canExit(): boolean{
    if(this.offerForm.form.valid || this.offerForm.form.dirty){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
  }

  _tableSortEvent(event: {headerName: string,type: boolean}): void{
    let product = [];
    product = [...this.filterOffers];
    product.sort((a,b)=>{return event.type ? a[event.headerName].localeCompare(b[event.headerName]) : b[event.headerName].localeCompare(a[event.headerName])});
    this.filterOffers = [...product];
    this.paginationOffer = this.commonService.loadPagination(this.filterOffers, this.updatedItemsPerPage);
  }

  _searchTextEvent(event: {searchText: string}): void{
    this.filterText = event.searchText;
    if(this.filterText == ''){
      this.filterOffers = [...this.offers];
    }
    else{
      this.filterOffers = this.filterPipe.transform(this.offers,this.filterText);
    }
    this.paginationOffer = this.commonService.loadPagination(this.filterOffers, this.updatedItemsPerPage);
  }

  getOffers(){
    this.adminService.getOffers().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.offers = res;
      this.filterOffers = [...this.offers];
      this.paginationOffer = this.commonService.loadPagination(this.filterOffers);
    }));
  }

  _perPageSelectionChanged(value: number): void{
    this.updatedItemsPerPage = value;
    this.paginationOffer = this.commonService.loadPagination(this.filterOffers, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.updatedItemsPerPage = event.perPageSelection;
    this.paginationOffer = this.commonService.loadPagination(this.filterOffers, event.perPageSelection, event.currentPage);
  }

  editOffer(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
    this.updateBlankForm(each);
  }

  updateBlankForm(each: any): void{
    this.offerCode = each.offerCode;
    this.minimumOrderValue = each.minimumOrderValue;
    this.offerSection = each.offerSection;
    this.offeredBy = each.offeredBy;
    this.discount = each.discount;
  }

  deleteOffer(each: any): void{
    const content = StaticMsg.deleteItemConfirmationText;
    const title = StaticMsg.deleteItemConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //when user confirms, call delete functionality
      this.deleteOffersSubscription = this.adminService.deleteOffer(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = `offer ${StaticMsg.admin_data_deleted}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.getOffers();
      },
      (error: any)=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    });
  }

  offersFormSubmit(offerForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      if(!offerForm.dirty){
        const msg = `${StaticMsg.admin_no_data_change}`;
        const color = 'orange';
        this.showShortMsg(msg,color);
        return;
      }
      this.updateOffersSubscription = this.adminService.updateOffers(this.selectedID,offerForm.value).subscribe((data: any)=>{
        const msg = `offer ${StaticMsg.admin_data_updated}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.editMode = false;
        this.buttonText = "Continue";
        this.selectedID = "";
        this.offersFormReset(offerForm);
        this.getOffers();
      },
      error=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    }
    else{
      if(!this.commonService.checkDuplicate(offerForm.value.offerCode,this.offers,'offerCode')){
        console.log(offerForm.value);
        this.addOffersSubscriptiton = this.adminService.addOffers(offerForm.value).subscribe((res: any)=>{
          this.getOffers();
          const msg = `offer ${StaticMsg.admin_data_added}`;
          const color = 'green';
          this.showShortMsg(msg,color);
          this.offersFormReset(offerForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg(`${StaticMsg.admin_data_duplicate}`,'red');
      }
    }
  }

  offersFormReset(offerForm: NgForm): void{
    offerForm.resetForm();
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

  checkFormStatus(): boolean{
    let val = true;
    if(this.offerForm?.invalid){
      val = true;
    }
    else{
      if(this.offerSection == 'bank'){
        if(this.offerSubSection.length > 0){
          this.offerSubSection.forEach(element => {
            if(element.subSectionValue){
              val = false;
            }
          });
        }
      }
    }
    return val;
  }

  ngOnDestroy(): void {
    this.addOffersSubscriptiton?.unsubscribe();
    this.updateOffersSubscription?.unsubscribe();
    this.deleteOffersSubscription?.unsubscribe();
  }

}
