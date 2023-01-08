import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SignUpModalComponent } from '../sign-up/signUp-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  emailAddress: string;
  password: string;
  title?: string = 'Default Modal';
  loginErrorMsg: string = "";
  loginFailedStatus: boolean = false;
  loginClicked = new EventEmitter<any>();
  signUpClickedOpenLogin = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  submitForm(data: NgForm): void {
    console.log(data.value);
    /*write API Calls, get details & send back to Header components with eventEmitter
      call Login API => take token
      call Cart API
      call Profile API
      send CART, PROFILE & WISHLIST array to Header (Parent) component
    */
    //loginAPI
    this.authService.getLogin(data.value).then((res: any)=>{
      console.log("Login Data " +  JSON.stringify(res));
      this.loginFailedStatus = false;
      this.loginErrorMsg = "";
      //sample PROFILE API
      const profile = {
        name: 'Sudipta Sil',
        phone: '9830997610',
        member: 'silver',
        email: 'sudipta.sil.2000@gmail.com',
        deliveryAddress: [],
      }
      //sample LOGIN API
      const login = {
        sid: '4hz3468b-a179-4058-aaf2-086461479b52',
        success: true,
      }
      //sample CART API
      const cart = [];
      //send CART, PROFILE, TOKEN to Header (Parent) component
      this.loginClicked.emit({profile: profile, cart: cart, login: login});
    },
    ((error: any)=>{
      this.loginFailedStatus = true;
      this.loginErrorMsg = error.message;
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

  resetForm(data: NgForm): void {
    data.resetForm();
    this.loginFailedStatus = false;
    this.loginErrorMsg = "";
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

}
