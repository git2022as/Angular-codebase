import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { staticValue } from 'src/app/constants/constant';
import { OrderStatusChangeComponent } from 'src/app/shared/order-status-change/order-status-change.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-admin-orders-entry',
  templateUrl: './admin-orders-entry.component.html',
  styleUrls: ['./admin-orders-entry.component.scss']
})

export class AdminOrdersEntryComponent implements OnInit, OnDestroy {

  getOrderSubscription: Subscription | undefined;
  updateOrdersSubscription: Subscription | undefined;
  dishes: any;
  orders: any;
  productsAvailable: boolean = false;
  selectedOrder: any;
  paginationOrder : Array<any> = [];
  updatedItemsPerPage: number = staticValue.paginationPerPageConstant;

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;

  constructor(private adminService: AdminService,
              public commonService: CommonService,
              private bsModalRef: BsModalRef,
              private bsModalService: BsModalService,
              private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getDishes();
    this.getAllOrders();
  }

  getDishes(): void{
    this.adminService.getDishes().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    },take(1))).subscribe(((res: any)=>{
      this.dishes = res;
      this.productsAvailable = true;
    }))
  }

  getAllOrders(){
    this.getOrderSubscription = this.adminService.getAllOrders().pipe(map(res=>{
      let data = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            for(let key1 in res[key]){
              if(res[key].hasOwnProperty(key1) && (res[key][key1].orderStatus == 'ordered' || res[key][key1].orderStatus == 'intrans')){
                data.push({uid: key, id: key1, ...res[key][key1]});
              }
            }
          }
        }
      }
      return data;
    })).subscribe((res: any)=>{
      if(res.length > 0){
        console.log(res);
        this.orders = res;
        this.paginationOrder = this.commonService.loadPagination(this.orders)
      }
    });
  }

  _perPageSelectionChanged(value: number): void{
    this.updatedItemsPerPage = value;
  }

  _paginationButtonChangedEvent(event: any): void{
    this.updatedItemsPerPage = event.perPageSelection;
  }

  _editOrderEvent(order: any): void{
    this.bsModalRef.hide();
    this.selectedOrder = order;
    const initialState: ModalOptions = {
      initialState: {
        title: 'Order Status Change',
        currectStatus: order.orderStatus
      }
    }
    this.bsModalRef = this.bsModalService.show(
      OrderStatusChangeComponent,
      initialState
    )

    this.bsModalRef.content.statusChangeEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      //back to this page, hence update the status
      //call UPADTE ORDERS API
      //if update successful then call GET ORDERS again
      this.updateStatusInOrder(res);
    });
  }
  
  updateStatusInOrder(updatedStatus: string): void{
    const uid = this.selectedOrder.uid;
    const id = this.selectedOrder.id;
    this.selectedOrder.orderStatus = updatedStatus;
    this.selectedOrder.deliveryTime = this.utilityService.calculateCurrentTime();
    this.updateOrdersSubscription = this.adminService.updateOrders(id, uid, this.selectedOrder).subscribe((data: any)=>{
      const msg = "Order Status has been updated";
      const color = 'green';
      this.showShortMsg(msg,color);
      this.selectedOrder = {};
      this.getAllOrders();
    },
    error=>{
      const msg = error.message;
      const color = 'red';
      this.showShortMsg(msg,color);
    });                             
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
    this.getOrderSubscription?.unsubscribe();
    this.updateOrdersSubscription?.unsubscribe();
  }

}
