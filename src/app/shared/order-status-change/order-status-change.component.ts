import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-status-change',
  templateUrl: './order-status-change.component.html',
  styleUrls: ['./order-status-change.component.scss']
})

export class OrderStatusChangeComponent implements OnInit {

  title?: string = 'Order Status Change';
  currectStatus: string = 'ordered';
  availableStatus: any[];
  statusChangeEvent = new EventEmitter<any>();
  statusChange: FormGroup;

  constructor(public bsModalRef: BsModalRef,
              private fb : FormBuilder) { }

  ngOnInit(): void {
    this.setAvailableStatus();
    this.createStatusForm();
  }

  setAvailableStatus(): void{
    if(this.currectStatus == 'ordered'){
      this.availableStatus = [{key: 'intrans', value: 'In-Transit'},{key: 'delivered', value: 'Delivered'}];
    }
    else{
      this.availableStatus = [{key: 'delivered', value: 'Delivered'}];
    }
  }

  createStatusForm(): void{
    this.statusChange = this.fb.group({
      selectedStatus : ['',[Validators.required]]
    })
  }

  changeStatus(){
    this.statusChangeEvent.emit(this.statusChange.value.selectedStatus);
  }

}
