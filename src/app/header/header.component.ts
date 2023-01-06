import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../shared/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data.service';
import { AdminLoginModalComponent } from '../shared/admin-login-modal/admin-login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  loggedInUserName: string = "";
  cartBadgeHidden: boolean = true;
  cartItemCount: string = "0";

  constructor(private modalService: BsModalService,
              private router: Router,
              public appCacheService: AppCacheService,
              private commonService: CommonService,
              private dataService: DataService,
              public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.subscribeDataService();
  }

  subscribeDataService(): void{
    this.dataService.UPDATE_CART_COUNT.subscribe((res: boolean) => {
      if(this.appCacheService._cartDetails.length > 0){
        let length = this.appCacheService._cartDetails.length;
        this.cartItemCount = length.toString();
        this.cartBadgeHidden = false;
      }
      else{
        this.cartItemCount = "0";
        this.cartBadgeHidden = true;
      }
    });
  }

  openLoginModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: "Login"
      }
    };
    this.bsModalRef = this.modalService.show(LoginModalComponent, initialState);

    //get event triggerd from modal component
    this.bsModalRef.content.loginClicked.subscribe((res: any) => {
      //when login is successful
      if(res.login.success){
        this.appCacheService._loggedInUser = res?.login?.success;
        this.appCacheService._tokenSID = res?.login?.sid;
        this.appCacheService._cartDetails = res?.cart;
        this.appCacheService._profileDetails = res?.profile;
        this.dataService.UPDATED_DISH.next(true);
        this.dataService.UPDATE_CART_COUNT.next(true);
      }
      else{
        //login is not successful block => write code here
      }
      this.bsModalRef?.hide();
    });
  }

  /* Admin Login Modal */
  openAdminLoginModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: "Admin Login"
      }
    };
    this.bsModalRef = this.modalService.show(AdminLoginModalComponent, initialState);

    //get event triggerd from modal component
    this.bsModalRef.content.adminLoginClicked.subscribe((res: any) => {
      //when admin login is successful
      if(res){
        this.appCacheService._adminLoggedIn = true;
        this.router.navigate(['admin/dashboard']);
      }
      else{
        this.appCacheService._adminLoggedIn = false;
      }
      this.bsModalRef?.hide();
    });
  }

  openLogoutModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        content: 'Are you sure want to logout?',
        title: 'Logout',
        type: 'confirmation',
        data: 'para',
        secondaryButton: true,
        primaryButtonText: 'Yes'
      }
    };
    this.bsModalRef = this.commonService.openStaticModal(initialState);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //call logout service here to clear all cache and call API service to clear SID
      this.commonService.logoutService();
      this.router.navigateByUrl('base');
      this.bsModalRef?.hide();
    });
  }

  openLink(val: string): void{
    if(val == 'logout'){
      this.openLogoutModal();
    }
    else
      this.router.navigateByUrl(val);
  }

}
