import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { cartExtraItems } from 'src/app/model/model';
import { cartExtraItem } from 'src/app/interface/project.interface';

@Component({
  selector: 'app-product-add-on',
  templateUrl: './product-add-on.component.html',
  styleUrls: ['./product-add-on.component.scss']
})

export class ProductAddOnComponent implements OnInit {

  EachItemPrice?: number = 0;
  title?: string = 'Add-On Items';
  AddOnEvent = new EventEmitter<any>();
  extraItem : Array<any> = [];
  totalPrice: number = 0;
  cartAddOnItemsConstant = cartExtraItems;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.createExtraItems();
    this.checkTotalPrice();
  }

  createExtraItems(): void{
    this.cartAddOnItemsConstant.forEach(each => {
      let sam : cartExtraItem = {
        name: each.name,
        value: false,
        extraPrice: each.extraPrice
      }
      this.extraItem.push(sam);
    })
  }

  addItemCheckbox(item: any): void{
    this.checkTotalPrice(item);
  }

  checkTotalPrice(item?: any): void{
    const quantity = 1;
    let basePrice = quantity * this.EachItemPrice;
    if(item){
      item.forEach(each =>{
        if(each.value){
          basePrice = basePrice + each.extraPrice;
        }
      });
    }
    this.totalPrice = basePrice;
  }

  addOnItem(){
    this.AddOnEvent.emit({addOn: this.extraItem, total: this.totalPrice});
  }

}
