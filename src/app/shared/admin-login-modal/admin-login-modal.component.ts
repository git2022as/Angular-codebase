import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { errorMessages } from 'src/app/constants/constant';

@Component({
  selector: 'app-admin-login-modal',
  templateUrl: './admin-login-modal.component.html',
  styleUrls: ['./admin-login-modal.component.scss']
})
export class AdminLoginModalComponent implements OnInit {

  adminUserName: string;
  adminPassword: string;
  title?: string;
  adminAuthFailedMsg: string = "";
  adminAuthFailedStatus: boolean = false; //false means SUCCESS & true means TRUE
  errorMessages = errorMessages;
  adminLoginClicked = new EventEmitter<any>();

  constructor(private router: Router,
              public bsModalRef: BsModalRef,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

  adminLogin(adminLoginForm: NgForm): void{
    console.log(adminLoginForm.value);
    if(adminLoginForm.value.adminUserName == 'admin' && adminLoginForm.value.adminPassword == 'admin'){
      this.adminAuthFailedMsg = "";
      this.adminAuthFailedStatus = false;
      this.adminLoginClicked.emit(true);
    }
    else{
      this.adminAuthFailedMsg = errorMessages.adminLoginError;
      this.adminAuthFailedStatus = true;
    }
  }

  resetAdminForm(adminLoginForm: NgForm): void{
    adminLoginForm.resetForm();
    this.adminAuthFailedStatus= false;
    this.adminAuthFailedMsg = "";
  }

}
