import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from '../../interface/project.interface';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg, staticValue, errorMessages, admin_headers } from 'src/app/constants/constant';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-admin-slides-entry',
  templateUrl: './admin-slides-entry.component.html',
  styleUrls: ['./admin-slides-entry.component.scss']
})

export class AdminSlidesEntryComponent implements OnInit, OnDestroy, deactivateInterface {

  imageSource: string;
  altText: string;
  imageText: string;
  addSlidesSubscriptiton: Subscription | undefined;
  updateSlidesSubscription: Subscription | undefined;
  deleteSlideSubscription: Subscription | undefined;
  editMode: boolean = false;
  buttonText: string = "Continue";
  slides: Array<any>;
  selectedID: string = "";
  slidesHeader = admin_headers.slide;
  paginationSlide : Array<any> = [];
  updatedItemsPerPage: number = staticValue.paginationPerPageConstant;
  filterSlides: Array<any>;
  filterText: string = "";
  errorMessages = errorMessages;

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("slidesForm", {read: NgForm}) slidesForm: any;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef,
              private filterPipe: FilterPipe,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.getSlides();
  }

  canExit(): boolean{
    if(this.slidesForm.form.valid || this.slidesForm.form.dirty){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
  }

  _tableSortEvent(event: {headerName: string,type: boolean}): void{
    let product = [];
    product = [...this.filterSlides];
    product.sort((a,b)=>{return event.type ? a[event.headerName].localeCompare(b[event.headerName]) : b[event.headerName].localeCompare(a[event.headerName])});
    this.filterSlides = [...product];
    this.paginationSlide = this.commonService.loadPagination(this.filterSlides, this.updatedItemsPerPage);
  }

  _searchTextEvent(event: {searchText: string}): void{
    let filterdData = [];
    this.filterText = event.searchText;
    if(this.filterText == ''){
      this.filterSlides = [...this.slides];
    }
    else{
      this.filterSlides = this.filterPipe.transform(this.slides,this.filterText);
    }
    this.paginationSlide = this.commonService.loadPagination(this.filterSlides, this.updatedItemsPerPage);
  }

  getSlides(){
    this.adminService.getSlides().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.slides = res;
      this.filterSlides = [...this.slides];
      this.paginationSlide = this.commonService.loadPagination(this.filterSlides);
    }));
  }

  _perPageSelectionChanged(value: number): void{
    this.updatedItemsPerPage = value;
    this.paginationSlide = this.commonService.loadPagination(this.filterSlides, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.updatedItemsPerPage = event.perPageSelection;
    this.paginationSlide = this.commonService.loadPagination(this.filterSlides, event.perPageSelection, event.currentPage);
  }

  editSlides(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
    this.updateBlankForm(each);
  }

  updateBlankForm(each: any): void{
    this.imageSource = each.imageSource;
    this.altText = each.altText;
    this.imageText = each.imageText;
  }

  deleteSlide(each: any): void{
    const content = StaticMsg.deleteItemConfirmationText;
    const title = StaticMsg.deleteItemConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //when user confirms, call delete functionality
      this.deleteSlideSubscription = this.adminService.deleteSlide(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = `slide ${StaticMsg.admin_data_deleted}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.getSlides();
      },
      (error: any)=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    });
  }

  slidesFormSubmit(slidesForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      if(!slidesForm.dirty){
        const msg = `${StaticMsg.admin_no_data_change}`;
        const color = 'orange';
        this.showShortMsg(msg,color);
        return;
      }
      this.updateSlidesSubscription = this.adminService.updateSlides(this.selectedID,slidesForm.value).subscribe((data: any)=>{
        const msg = `slide ${StaticMsg.admin_data_updated}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.editMode = false;
        this.buttonText = "Continue";
        this.selectedID = "";
        this.slidesFormReset(slidesForm);
        this.getSlides();
      },
      error=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    }
    else{
      if(!this.commonService.checkDuplicate(slidesForm.value.imageText,this.slides,'imageText')){
        console.log(slidesForm.value);
        this.addSlidesSubscriptiton = this.adminService.addSlides(slidesForm.value).subscribe((res: any)=>{
          this.getSlides();
          const msg = `slide ${StaticMsg.admin_data_added}`;
          const color = 'green';
          this.showShortMsg(msg,color);
          this.slidesFormReset(slidesForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg(`${StaticMsg.admin_data_duplicate}`,'red');
      }
    }
  }

  slidesFormReset(slidesForm: NgForm): void{
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
    this.addSlidesSubscriptiton?.unsubscribe();
    this.updateSlidesSubscription?.unsubscribe();
    this.deleteSlideSubscription?.unsubscribe();
  }

}
