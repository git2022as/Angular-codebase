import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { staticValue, errorMessages, StaticMsg, admin_headers } from 'src/app/constants/constant';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-admin-branches-entry',
  templateUrl: './admin-branches-entry.component.html',
  styleUrls: ['./admin-branches-entry.component.scss']
})
export class AdminBranchesEntryComponent implements OnInit, OnDestroy, deactivateInterface {

  branchLocation: string;
  locationImage: string;
  locationContact: number = null;
  locatiomTiming: string;
  latitude: number = null;
  longitude: number = null;
  branchPin: number = null;
  addBranchesSubscriptiton: Subscription | undefined;
  updateBranchesSubscription: Subscription | undefined;
  deleteBrancheSubscription: Subscription | undefined;
  editMode: boolean = false;
  buttonText: string = "Continue";
  branches: Array<any>;
  selectedID: string = "";
  branchesHeader = admin_headers.branch;
  paginationBranch : Array<any> = [];
  updatedItemsPerPage: number = staticValue.paginationPerPageConstant;
  filterdBranch: Array<any>;
  filterText: string = "";
  errorMessages = errorMessages;
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("branchesForm", {read: NgForm}) branchesForm: any;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef,
              private filterPipe: FilterPipe,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.getBranches();
  }

  canExit(): boolean{
    if(this.branchesForm.form.valid || this.branchesForm.form.dirty){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
  }

  _tableSortEvent(event: {headerName: string,type: boolean}): void{
    let product = [];
    product = [...this.filterdBranch];
    product.sort((a,b)=>{return event.type ? a[event.headerName].localeCompare(b[event.headerName]) : b[event.headerName].localeCompare(a[event.headerName])});
    this.filterdBranch = [...product];
    this.paginationBranch = this.commonService.loadPagination(this.filterdBranch, this.updatedItemsPerPage);
  }

  _searchTextEvent(event: {searchText: string}): void{
    let filterdData = [];
    this.filterText = event.searchText;
    if(this.filterText == ''){
      this.filterdBranch = [...this.branches];
    }
    else{
      this.filterdBranch = this.filterPipe.transform(this.branches,this.filterText);
    }
    this.paginationBranch = this.commonService.loadPagination(this.filterdBranch, this.updatedItemsPerPage);
  }

  getBranches(){
    this.adminService.getBranches().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.branches = res;
      this.filterdBranch = [...this.branches];
      this.paginationBranch = this.commonService.loadPagination(this.filterdBranch);
    }))
  }

  _perPageSelectionChanged(value: number): void{
    this.updatedItemsPerPage = value;
    this.paginationBranch = this.commonService.loadPagination(this.filterdBranch, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.updatedItemsPerPage = event.perPageSelection;
    this.paginationBranch = this.commonService.loadPagination(this.filterdBranch, event.perPageSelection, event.currentPage);
  }

  editSlides(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
    this.updateBlankForm(each);
  }

  updateBlankForm(each: any): void{
    this.branchLocation = each.branchLocation;
    this.locationImage = each.locationImage;
    this.locationContact = each.locationContact;
    this.locatiomTiming = each.locatiomTiming;
    this.branchPin = each.branchPin;
    this.latitude = each.latitude;
    this.longitude = each.longitude;
  }

  deleteSlide(each: any): void{
    const content = StaticMsg.deleteItemConfirmationText;
    const title = StaticMsg.deleteItemConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //when user confirms, call delete functionality
      this.deleteBrancheSubscription = this.adminService.deleteBranch(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = `branch ${StaticMsg.admin_data_deleted}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.getBranches();
      },
      (error: any)=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    });
  }

  branchesFormSubmit(branchesForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      if(!branchesForm.dirty){
        const msg = `${StaticMsg.admin_no_data_change}`;
        const color = 'orange';
        this.showShortMsg(msg,color);
        return;
      }
      this.updateBranchesSubscription = this.adminService.updateBranches(this.selectedID,branchesForm.value).subscribe((data: any)=>{
        const msg = `branch ${StaticMsg.admin_data_updated}`;
        const color = 'green';
        this.showShortMsg(msg,color);
        this.editMode = false;
        this.buttonText = "Continue";
        this.selectedID = "";
        this.branchesFormReset(branchesForm);
        this.getBranches();
      },
      error=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    }
    else{
      if(!this.commonService.checkDuplicate(branchesForm.value.branchPin,this.branches,'branchPin')){
        console.log(branchesForm.value);
        this.addBranchesSubscriptiton = this.adminService.addBranches(branchesForm.value).subscribe((res: any)=>{
          this.getBranches();
          const msg = `branch ${StaticMsg.admin_data_added}`;
          const color = 'green';
          this.showShortMsg(msg,color);
          this.branchesFormReset(branchesForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg(`${StaticMsg.admin_data_duplicate}`,'red');
      }
    }
  }

  branchesFormReset(branchesForm: NgForm): void{
    branchesForm.resetForm();
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
    this.addBranchesSubscriptiton?.unsubscribe();
    this.updateBranchesSubscription?.unsubscribe();
    this.deleteBrancheSubscription?.unsubscribe();
  }

}
