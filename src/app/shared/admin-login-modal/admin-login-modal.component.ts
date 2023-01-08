import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-login-modal',
  templateUrl: './admin-login-modal.component.html',
  styleUrls: ['./admin-login-modal.component.scss']
})
export class AdminLoginModalComponent implements OnInit {

  adminUserName: string;
  adminPassword: string;
  title?: string = 'Admin Modal';
  adminAuthFailedMsg: string = "";
  adminAuthFailedStatus: boolean = false; //false means SUCCESS & true means TRUE
  adminLoginClicked = new EventEmitter<any>();

  constructor(private router: Router,
              public bsModalRef: BsModalRef) { }

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
      this.adminAuthFailedMsg = "Login failed, please check credentials.";
      this.adminAuthFailedStatus = true;
    }
  }

  resetAdminForm(adminLoginForm: NgForm): void{
    adminLoginForm.resetForm();
    this.adminAuthFailedStatus= false;
    this.adminAuthFailedMsg = "";
  }

}
