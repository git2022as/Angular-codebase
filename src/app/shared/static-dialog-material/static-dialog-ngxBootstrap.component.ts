import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-static-dialog-ngxBootstrap',
  templateUrl: './static-dialog-ngxBootstrap.component.html',
  styleUrls: ['./static-dialog-ngxBootstrap.component.scss']
})
export class StaticDialogNgxBootstrapComponent implements OnInit {

  title?: string = "Default Modal";
  data?: 'list' | 'para' = 'list';
  content?: any;
  type?: 'info' | 'error' | 'confirmation' = "info";
  primaryButton?: boolean = true;
  secondaryButton?: boolean = false;
  primaryButtonText?: string = "OK";
  secondaryButtonText?: string = "Cancel";
  //secondary button clicks always close the modal

  constructor(public modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  clickPrimaryButton(): void{
    if(this.type == 'info' || this.type == 'error'){
      this.modalRef.hide();
    }
  }


}
