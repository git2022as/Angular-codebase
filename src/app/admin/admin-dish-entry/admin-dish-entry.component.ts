import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from 'src/app/interface/project.interface';
import { StaticMsg } from 'src/app/constants/constant';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-dish-entry',
  templateUrl: './admin-dish-entry.component.html',
  styleUrls: ['./admin-dish-entry.component.scss']
})
export class AdminDishEntryComponent implements OnInit, OnDestroy, deactivateInterface {

  dishName: string;
  dishOrigin: string;
  dishImage: string;
  dishImageText: string;
  dishDesc: string;
  dishQuantity: number = null;
  Quantity = [1,2,3,4,5,6,7,8,9,10];
  dishPrice: number = null;
  dishComplementary: string;
  dishIngradient: string;
  dishFat: number;
  dishCholesterol: number;
  dishSodium: number;
  dishCarbohydrate: number;
  dishProtein: number;
  dishCalcium: number;
  dishPotassium: number;
  addDishesSubscriptiton: Subscription | undefined;
  updateDishSubscription: Subscription | undefined;
  deleteDishSubscription: Subscription | undefined;
  dishes: Array<any>;
  paginationDishes: Array<any>;
  dishHeader = ["Dish's Name","Dish's Price", "Actions"];
  editMode: boolean = false;
  buttonText: string = "Continue";
  selectedID: string = "";
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("dishForm", {read: NgForm}) dishForm: any;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getDishes();
  }

  canExit(): boolean{
    if(this.dishForm.form.valid  || this.dishForm.form.dirty){
      return confirm(StaticMsg.adminDeActivateMsg);
    }
    else{
      return true;
    }
  }

  getDishes(){
    this.adminService.getDishes().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.dishes = res;
      this.paginationDishes = this.commonService.loadPagination(this.dishes);
    }))
  }

  deleteDish(each: any): void{
    const content = StaticMsg.deleteItemConfirmationText;
    const title = StaticMsg.deleteItemConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //when user confirms, call delete functionality
      this.deleteDishSubscription = this.adminService.deleteDish(each.id).subscribe((res: any)=>{
        this.bsModalRef.hide();
        const msg = "dish has been deleted";
        const color = 'green';
        this.showShortMsg(msg,color);
        this.getDishes();
      },
      (error: any)=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    });
  }

  editDish(each: any): void{
    console.log(each);
    this.editMode = true;
    this.selectedID = each.id;
    this.buttonText = "Update";
    this.updateBlankForm(each);
  }

  updateBlankForm(each: any): void{
    this.dishName = each.dishName;
    this.dishOrigin = each.dishOrigin;
    this.dishImage = each.dishImage;
    this.dishImageText = each.dishImageText;
    this.dishDesc = each.dishDesc;
    this.dishQuantity = each.dishQuantity;
    this.dishPrice = each.dishPrice;
    this.dishComplementary = each.dishComplementary;
    this.dishIngradient = each.dishIngradient.join(',');
    this.dishFat = each.dishCalorie.dishFat;
    this.dishCholesterol = each.dishCalorie.dishCholesterol;
    this.dishSodium = each.dishCalorie.dishSodium;
    this.dishCarbohydrate = each.dishCalorie.dishCarbohydrate;
    this.dishProtein = each.dishCalorie.dishProtein;
    this.dishCalcium = each.dishCalorie.dishCalcium;
    this.dishPotassium = each.dishCalorie.dishPotassium;
  }

  _perPageSelectionChanged(value: number): void{
    this.paginationDishes = this.commonService.loadPagination(this.dishes, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.paginationDishes = this.commonService.loadPagination(this.dishes, event.perPageSelection, event.currentPage);
  }

  checkDuplicate(value,arr): boolean{
    let dup = false;
    arr.forEach((x)=>{if(x.dishName.toUpperCase() == value.toUpperCase())
      {dup = true;}
    });
    return dup;
  }

  dishFormSubmit(dishForm: NgForm): void{
    if(this.editMode){
      //when edit mode is ON, call the update functionality
      if(!dishForm.dirty){
        const msg = "It seems, you haven't changed any value yet";
        const color = 'orange';
        this.showShortMsg(msg,color);
        return;
      }
      let data = {};
      data = this.createDataForAddUpdateCall(dishForm);
      this.updateDishSubscription = this.adminService.updateDishes(this.selectedID,data).subscribe((data: any)=>{
        const msg = "dish has been updated";
        const color = 'green';
        this.showShortMsg(msg,color);
        this.editMode = false;
        this.buttonText = "Continue";
        this.selectedID = "";
        this.dishFormReset(dishForm);
        this.getDishes();
      },
      error=>{
        const msg = error.message;
        const color = 'red';
        this.showShortMsg(msg,color);
      });
    }
    else{
      if(!this.checkDuplicate(dishForm.value.dishName,this.dishes)){ 
        let data = {};
        data = this.createDataForAddUpdateCall(dishForm);
        console.log(JSON.stringify(data));
        this.addDishesSubscriptiton = this.adminService.addDishes(data).subscribe((res: any)=>{
          this.getDishes();
          const msg = "dish has been added";
          const color = 'green';
          this.showShortMsg(msg,color);
          this.dishFormReset(dishForm);
          document.getElementById('top').scrollIntoView({behavior: 'smooth'});
        });
      }
      else{
        //Duplicate scene
        this.showShortMsg('Duplicate item, please add a new item.','red');
      }
    }
  }

  createDataForAddUpdateCall(dishForm: NgForm): object{
    let dishCalorie = {};
    let ingradient = []; 
    let data = {};
    dishCalorie['dishFat'] = dishForm.value.dishFat;
    dishCalorie['dishCholesterol'] = dishForm.value.dishCholesterol;
    dishCalorie['dishSodium'] = dishForm.value.dishSodium;
    dishCalorie['dishCarbohydrate'] = dishForm.value.dishCarbohydrate;
    dishCalorie['dishProtein'] = dishForm.value.dishProtein;
    dishCalorie['dishCalcium'] = dishForm.value.dishCalcium;
    dishCalorie['dishPotassium'] = dishForm.value.dishPotassium;
    ingradient = dishForm.value.dishIngradient.split(',');
    data['dishName'] = dishForm.value.dishName;
    data['dishOrigin'] = dishForm.value.dishOrigin;
    data['dishImage'] = dishForm.value.dishImage;
    data['dishImageText'] = dishForm.value.dishImageText;
    data['dishDesc'] = dishForm.value.dishDesc;
    data['dishQuantity'] = dishForm.value.dishQuantity;
    data['dishPrice'] = dishForm.value.dishPrice;
    data['dishComplementary'] = dishForm.value.dishComplementary;
    data['dishIngradient'] = ingradient;
    data['dishCalorie'] = dishCalorie;
    return data;
  }

  dishFormReset(dishForm: NgForm): void{
    dishForm.resetForm();
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
    this.addDishesSubscriptiton?.unsubscribe();
    this.updateDishSubscription?.unsubscribe();
    this.deleteDishSubscription?.unsubscribe();
  }

}
