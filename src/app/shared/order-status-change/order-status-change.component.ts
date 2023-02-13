import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { StaticMsg } from 'src/app/constants/constant';

@Component({
  selector: 'app-order-status-change',
  templateUrl: './order-status-change.component.html',
  styleUrls: ['./order-status-change.component.scss']
})

export class OrderStatusChangeComponent implements OnInit {

  title?: string;
  currectStatus: string = StaticMsg.admin_orderedKeyStatus;
  availableStatus: any[];
  statusChangeEvent = new EventEmitter<any>();
  statusChange: FormGroup;

  constructor(public bsModalRef: BsModalRef,
              private fb : FormBuilder,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.setAvailableStatus();
    this.createStatusForm();
  }

  setAvailableStatus(): void{
    if(this.currectStatus == StaticMsg.admin_orderedKeyStatus){
      this.availableStatus = [{key: StaticMsg.admin_inTransKeyStatus, value: StaticMsg.admin_inTransStatus},{key: StaticMsg.admin_deliveredKeyStatus, value: StaticMsg.admin_deliveredStatus}];
    }
    else{
      this.availableStatus = [{key: StaticMsg.admin_deliveredKeyStatus, value: StaticMsg.admin_deliveredStatus}];
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
