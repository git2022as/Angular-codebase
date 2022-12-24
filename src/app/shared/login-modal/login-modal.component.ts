import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SignUpModalComponent } from '../sign-up/signUp-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  phoneNumber: any;
  otp: any;
  title?: string = "Default Modal";
  loginClicked : EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private bsModalService: BsModalService) { }

  ngOnInit(): void {
  }

  submitForm(data: NgForm): void{
    console.log(data.value);
    //write API Calls, get details & send back to Header components with eventEmitter
    //EventEmitter without OUTPUT
    this.loginClicked.emit({name: "Sudipta"});
  }

  getOtp(data: NgForm): void{//get otp API call => to get 6 digits random SMS
    const minm = 100000;
    const maxm = 999999;
    this.otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  resetForm(data: NgForm): void{
    data.resetForm();
  }

  signUpModal():void{
    this.bsModalRef.hide();
    const initialState: ModalOptions = {
      initialState: {
        title: "Sign Up"
      }
    };
    this.bsModalRef = this.bsModalService.show(SignUpModalComponent, initialState);
  }
}
