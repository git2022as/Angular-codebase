import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from '../../interface/project.interface';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg } from 'src/app/constants/constant';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  editMode: boolean = false;
  buttonText: string = "Continue";
  slides: Array<any>;
  selectedID: string = "";
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("slidesForm", {read: NgForm}) slidesForm: any;

  constructor(private adminService: AdminService,
              private commonService: CommonService,
              private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getSlides();
  }

  canExit(): boolean{
    if(this.slidesForm.form.touched && (this.slidesForm.form.valid || this.slidesForm.form.invalid)){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
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
    }));
  }

  editSlides(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
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
      this.adminService.deleteSlide(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = "slide has been deleted";
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

  ngOnDestroy(): void {
    this.addSlidesSubscriptiton?.unsubscribe();
    this.updateSlidesSubscription?.unsubscribe();
  }

  checkDuplicate(value,arr): boolean{
    let dup = false;
    arr.forEach((x)=>{if(x.imageText.toUpperCase() == value.toUpperCase())
      {dup = true;}
    });
    return dup;
  }

  slidesFormSubmit(slidesForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      this.updateSlidesSubscription = this.adminService.updateSlides(this.selectedID,slidesForm.value).subscribe((data: any)=>{
        const msg = "slide has been updated";
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
      })
    }
    else{
      if(!this.checkDuplicate(slidesForm.value.imageText,this.slides)){
        console.log(slidesForm.value);
        this.addSlidesSubscriptiton = this.adminService.addSlides(slidesForm.value).subscribe((res: any)=>{
          this.getSlides();
          const msg = "slide has been added";
          const color = 'green';
          this.showShortMsg(msg,color);
          this.slidesFormReset(slidesForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg('Duplicate slides, please add a new slides.','red');
      }
    }
  }

  slidesFormReset(slidesForm: NgForm): void{
    slidesForm.resetForm();
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

}
