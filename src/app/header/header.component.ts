import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../shared/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data.service';
import { AdminLoginModalComponent } from '../shared/admin-login-modal/admin-login-modal.component';
import { AuthService } from '../services/auth.service';
import { SignUpModalComponent } from '../shared/sign-up/signUp-modal.component';
import { StaticMsg } from '../constants/constant';

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
              public dataService: DataService,
              public bsModalRef: BsModalRef,
              private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscribeDataService();
  }

  subscribeDataService(): void{
    //check for login from local storage
    this.localHostStateManagement();
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

  localHostStateManagement(): void{
    const userdata = JSON.parse(localStorage.getItem('userData'));
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const slides = JSON.parse(localStorage.getItem('slides'));
    const dishes = JSON.parse(localStorage.getItem('dishes'));
    const branches = JSON.parse(localStorage.getItem('branches'));
    const offersDetails = JSON.parse(localStorage.getItem('offersDetails'));
    const couponDetails = JSON.parse(localStorage.getItem('couponDetails'));
    const cartValue = JSON.parse(localStorage.getItem('cartValue'));
    const appliedOffer = JSON.parse(localStorage.getItem('appliedOffer'));
    const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon'));
    const adminLoggedIn = JSON.parse(localStorage.getItem('adminLoggedIn'));
    if(userdata){
      this.autoSignOut(userdata);
      this.appCacheService._UID = userdata?.uid;
      this.appCacheService._loggedInUser = true;
      this.appCacheService._token = userdata?.token;
      this.appCacheService._loggedInUserEmail = userdata?.email;
    }
    if(cartData){
      this.appCacheService._cartDetails = cartData;
      this.dataService.UPDATED_DISH.next(true);
      this.dataService.UPDATE_CART_COUNT.next(true);
    }
    if(cartValue){
      this.appCacheService._cartValue = cartValue;
    }
    if(appliedOffer){
      this.appCacheService._appliedOffer = appliedOffer;
    }
    if(appliedCoupon){
      this.appCacheService._appliedCoupon = appliedCoupon;
    }
    if(couponDetails){
      this.appCacheService._couponDetails = couponDetails;
    }
    if(offersDetails){
      this.appCacheService._offersDetails = offersDetails;
    }
    if(profileData){
      this.appCacheService._profileDetails = profileData;
    }
    if(dishes){
      this.appCacheService._dishesDetails = dishes;
    }
    if(adminLoggedIn){
      this.appCacheService._adminLoggedIn = true;
    }
  }

  openLoginModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: "Login"
      }
    };
    this.bsModalRef = this.modalService.show(LoginModalComponent, initialState);
    this.bsModalRef.content.loginClicked.subscribe((res: any) => {
      //when login is successful
      if(res.login.uid != ""){
        //save data in localstorage to maintain state
        localStorage.setItem('userData', JSON.stringify(res.login));
        localStorage.setItem('cartData', JSON.stringify(res.cart));
        localStorage.setItem('profileData', JSON.stringify(res.profile));
        this.manageLoginState(res);
        this.autoSignOut(res.login);
      }
      this.bsModalRef?.hide();
    });
    this.bsModalRef.content.signUpClickedOpenLogin.subscribe((res: any) => {
      //when sign up is successful from login modal, again open fresh login modal
      this.bsModalRef?.hide();
      if(res){
        this.openLoginModal();
      }
    });
  }

  manageLoginState(res: any): void{
    this.appCacheService._UID = res?.login?.uid;
    this.appCacheService._loggedInUser = true;
    this.appCacheService._token = res?.login?.token;
    //this.appCacheService._loggedInUserName = res?.login?.name;
    this.appCacheService._loggedInUserEmail = res?.login?.email;
    this.appCacheService._cartDetails = res?.cart;
    this.appCacheService._profileDetails = res?.profile;
    this.dataService.UPDATED_DISH.next(true);
    this.dataService.UPDATE_CART_COUNT.next(true);
  }

  openSignUpModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: "Sign Up"
      }
    };
    this.bsModalRef = this.modalService.show(SignUpModalComponent, initialState);
    this.bsModalRef.content.signUpSuccessfulEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      //when Signup is successful open login modal
      this.openLoginModal();
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
    this.bsModalRef.content.adminLoginClicked.subscribe((res: any) => {
      //when admin login is successful
      if(res){
        this.appCacheService._adminLoggedIn = true;
        localStorage.setItem('adminLoggedIn','true');
        this.router.navigate(['admin/dashboard']);
      }
      else{
        this.appCacheService._adminLoggedIn = false;
        localStorage.removeItem('adminLoggedIn');
      }
      this.bsModalRef?.hide();
    });
  }

  openLogoutModal(): void{
    const content = StaticMsg.logoutConfirmationText;
    const title = StaticMsg.logoutConfirmationTitle;
    this.bsModalRef = this.commonService.openConfirmationModal(content,title);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //call logout service here to clear all cache and call API service to clear SID
      this.authService.logoutUser().then((res: any)=>{
        console.log("logout called " + JSON.stringify(res));
        this.commonService.logoutService();
        this.router.navigateByUrl('base');
      },
      (error: any)=>{
        alert(error.message);
      });
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

  autoSignOut(user: any){
    const expiresData = user.expires;
    setTimeout(()=>{
      this.commonService.logoutService();
      this.router.navigateByUrl('base');
    },expiresData*1000)
  }

}
