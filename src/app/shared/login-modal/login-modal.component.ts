import {Component, OnInit, EventEmitter} from '@angular/core'
import {NgForm} from '@angular/forms'
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal'
import {SignUpModalComponent} from '../sign-up/signUp-modal.component'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  phoneNumber: any
  otp: any
  title?: string = 'Default Modal'
  loginClicked: EventEmitter<any> = new EventEmitter()
  constructor(
    public bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ngOnInit(): void {}

  submitForm(data: NgForm): void {
    console.log(data.value)
    //write API Calls, get details & send back to Header components with eventEmitter
    //call Login API => take token
    //call Cart API
    //call Profile API
    //call Wishlist API
    //send CART, PROFILE & WISHLIST array to Header (Parent) component
    //EventEmitter without OUTPUT
    //sample CART API
    const cart = [
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
    ]
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
    this.loginClicked.emit({profile: profile, cart: cart, login: login})
  }

  getOtp(data: NgForm): void {
    //get otp API call => to get 6 digits random SMS
    const minm = 100000
    const maxm = 999999
    this.otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm
  }

  resetForm(data: NgForm): void {
    data.resetForm()
  }

  signUpModal(): void {
    this.bsModalRef.hide()
    const initialState: ModalOptions = {
      initialState: {
        title: 'Sign Up',
      },
    }
    this.bsModalRef = this.bsModalService.show(
      SignUpModalComponent,
      initialState
    )
  }
}
