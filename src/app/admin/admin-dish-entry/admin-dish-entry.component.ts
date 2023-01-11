import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { deactivateInterface } from 'src/app/interface/project.interface';
import { StaticMsg } from 'src/app/constants/constant';
import { CommonService } from 'src/app/services/common.service';

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
  addDishesSubscriptiton: Subscription | undefined;
  dishes: Array<any>;
  paginationDishes: Array<any>;
  dishHeader = ["Dish's Name","Dish's Price", "Actions"];
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  @ViewChild("dishForm", {read: NgForm}) dishForm: any;

  constructor(private adminService: AdminService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  canExit(): boolean{
    if(this.dishForm.form.touched && (this.dishForm.form.valid || this.dishForm.form.invalid)){
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

  }

  editDish(each: any): void{

  }

  _perPageSelectionChanged(value: number): void{
    this.paginationDishes = this.commonService.loadPagination(this.dishes, value);
  }

  _paginationButtonChangedEvent(event: any): void{
    this.paginationDishes = this.commonService.loadPagination(this.dishes, event.perPageSelection, event.currentPage);
  }

  ngOnDestroy(): void {
    this.addDishesSubscriptiton?.unsubscribe();
  }

  checkDuplicate(value,arr): boolean{
    let dup = false;
    arr.forEach((x)=>{if(x.dishName.toUpperCase() == value.toUpperCase())
      {dup = true;}
    });
    return dup;
  }

  dishFormSubmit(dishForm: NgForm): void{
    if(!this.checkDuplicate(dishForm.value.dishName,this.dishes)){
      let ingradient = [];
      let dishCalorie = {};
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

}
