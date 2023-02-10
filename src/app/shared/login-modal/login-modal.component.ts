import { Component, OnInit, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SignUpModalComponent } from '../sign-up/signUp-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { signInResponseInterface } from 'src/app/interface/project.interface';
import { map, mergeMap, take } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { errorMessages } from '../../constants/constant';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  emailAddress: string;
  password: string;
  title?: string;
  loginMsg: string = "";
  loginFailedStatus: boolean = false;
  isVisibility: boolean = true;
  loginClicked = new EventEmitter<any>();
  signUpClickedOpenLogin = new EventEmitter<any>();
  forgotEmailAdd: string;
  loginSuccessStatus: boolean = false;
  forgotPassForm: any;
  login: any = {
    uid: '',
    email: '',
    token: '',
    expires: ''
  };
  profile: any = {};
  loginSubscription: Subscription | undefined;
  errorMessages = errorMessages;

  @ViewChild("loginPass", {static: true}) loginPass : ElementRef;

  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private authService: AuthService,
    public commonService: CommonService,
    public appCacheService: AppCacheService
  ) {}

  ngOnInit(): void {}

  /*write API Calls, get details & send back to Header components with eventEmitter
      call Login API => take token & uid
      call Cart API => get user based cart details
      call Profile API => user based profile details
      send CART, PROFILE & LOGIN array to Header (Parent) component
  /*********** loginAPI **************/
  submitForm(data?: NgForm): void {
    console.log(data.value);
    this.loginSubscription = this.authService.getLogin(data.value).pipe(map((res: signInResponseInterface)=>{
        this.loginFailedStatus = false;
        this.loginMsg = "";
        this.login.uid = res.localId ? res.localId : "";
        this.login.email = res.email ? res.email : "";
        this.login.token = res.idToken ? res.idToken : "";
        this.login.expires = res.expiresIn ? res.expiresIn : "";
        return res;
      }),
      //CART API with MERGEMAP
      mergeMap(res => this.authService.getFromCart(res.localId)),take(1)).pipe(map((data: any)=>{
        console.log("data after add to cart " + data);
        let cart = [];
        for(let key in data){
          if(data.hasOwnProperty(key))
            cart.push({...data[key], cartID: key});
        }
        return cart;
      })).subscribe((cart: any)=>{
      if(cart){
        this.loginClicked.emit({profile: this.profile, cart: cart, login: this.login});
      }
    },
    (error: any)=>{
      this.loginFailedStatus = true;
      this.loginMsg = error.error.error.message;
    });
  };

  openForgotPassModal(): void{
    this.bsModalRef.hide();
    const initialState: ModalOptions = {
      initialState: {
        title: this.appCacheService._content.header.forgotPassword
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
        title: this.appCacheService._content.header.signUp
        ,
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

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
