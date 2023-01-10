import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';

@Component({
  selector: 'app-admin-slides-entry',
  templateUrl: './admin-slides-entry.component.html',
  styleUrls: ['./admin-slides-entry.component.scss']
})
export class AdminSlidesEntryComponent implements OnInit, OnDestroy {

  imageSource: string;
  altText: string;
  imageText: string;
  addSlidesSubscriptiton: Subscription | undefined;
  slides: Array<any>;
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getSlides();
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

  ngOnDestroy(): void {
    this.addSlidesSubscriptiton?.unsubscribe();
  }

  checkDuplicate(value,arr): boolean{
    let dup = false;
    arr.forEach((x)=>{if(x.imageText.toUpperCase() == value.toUpperCase())
      {dup = true;}
    });
    return dup;
  }

  slidesFormSubmit(slidesForm: NgForm): void{
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
