import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SignUpModalComponent } from '../sign-up/signUp-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  emailAddress: string;
  password: string;
  title?: string = 'Default Modal';
  loginMsg: string = "";
  loginFailedStatus: boolean = false;
  isVisibility: boolean = true;
  loginClicked = new EventEmitter<any>();
  signUpClickedOpenLogin = new EventEmitter<any>();
  forgotEmailAdd: string;
  loginSuccessStatus: boolean = false;
  forgotPassForm: any;
  
  @ViewChild("loginPass", {static: true}) loginPass : ElementRef;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  submitForm(data?: NgForm): void {
    console.log(data.value);
    /*write API Calls, get details & send back to Header components with eventEmitter
      call Login API => take token
      call Cart API
      call Profile API
      send CART, PROFILE & WISHLIST array to Header (Parent) component
    */
    /*********** loginAPI **************/
    this.authService.getLogin(data.value).then((res: any)=>{
      console.log("Login Data " +  JSON.stringify(res));
      this.loginFailedStatus = false;
      this.loginMsg = "";
      const login = {
        uid: res.user.uid ? res.user.uid : "",
        email: res.user.email ? res.user.email : "",
        name: res.user.displayName ? res.user.displayName : "",
        refreshToken: res.user.refreshToken ? res.user.refreshToken : ""
      }
      //sample PROFILE API
      const profile = {
        name: 'Sudipta Sil',
        phone: '9830997610',
        member: 'silver',
        email: 'sudipta.sil.2000@gmail.com',
        deliveryAddress: [],
      }
      //sample CART API
      const cart = [];
      //send CART, PROFILE, TOKEN to Header (Parent) component
      this.loginClicked.emit({profile: profile, cart: cart, login: login});
    },
    ((error: any)=>{
      this.loginFailedStatus = true;
      this.loginMsg = error.message;
    }));
  
    /*const cart = [
      {
        quantity: 2,
        tprice: 360,
        addOn: [
          {name: 'Extra Cheese', value: false, extraPrice: 20},
          {name: 'Oliv Oil Cooking ', value: false, extraPrice: 30},
        ],
        itemId: 1,
      },
      {
        quantity: 2,
        tprice: 400,
        addOn: [
          {name: 'Extra Cheese', value: false, extraPrice: 20},
          {name: 'Oliv Oil Cooking ', value: false, extraPrice: 30},
        ],
        itemId: 2,
      },
      {
        quantity: 1,
        tprice: 200,
        addOn: [
          {name: 'Extra Cheese', value: false, extraPrice: 20},
          {name: 'Oliv Oil Cooking ', value: false, extraPrice: 30},
        ],
        itemId: 3,
      },
      {
        quantity: 3,
        tprice: 750,
        addOn: [
          {name: 'Extra Cheese', value: false, extraPrice: 20},
          {name: 'Oliv Oil Cooking ', value: false, extraPrice: 30},
        ],
        itemId: 4,
      }
    ]*/
  }

  /*getOtp(data: NgForm): void {
    //get otp API call => to get 6 digits random SMS
    const minm = 100000
    const maxm = 999999
    this.otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm
  }*/

  openForgotPassModal(): void{
    this.bsModalRef.hide();
    const initialState: ModalOptions = {
      initialState: {
        title: 'Forgot Password'
      }
    }
    this.bsModalRef = this.bsModalService.show(
      ForgotPasswordComponent,
      initialState
    )

    this.bsModalRef.content.backToSignInEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      //back to this page, hence open login modal again
      //use the same signup modal event
      this.signUpClickedOpenLogin.emit(true);
    });
  }

  resetForm(data?: NgForm): void {
    data.resetForm();
    this.loginPass.nativeElement.setAttribute('type', 'password');
    this.loginFailedStatus = false;
    this.loginMsg = "";
  }

  signUpModal(): void {
    this.bsModalRef.hide();
    const initialState: ModalOptions = {
      initialState: {
        title: 'Sign Up',
      }
    }
    this.bsModalRef = this.bsModalService.show(
      SignUpModalComponent,
      initialState
    )

    this.bsModalRef.content.signUpSuccessfulEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      //when Signup is successful open login modal
      this.signUpClickedOpenLogin.emit(true);
    });
  }

  showHidePassword(): void{
    if(this.loginPass.nativeElement.getAttribute('type') == 'password')
      this.loginPass.nativeElement.setAttribute('type', 'text');
    else
      this.loginPass.nativeElement.setAttribute('type', 'password');
  }

}
