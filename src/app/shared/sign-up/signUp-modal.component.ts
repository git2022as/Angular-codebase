import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signUp-modal',
  templateUrl: './signUp-modal.component.html',
  styleUrls: ['./signUp-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {

  phoneNumber: any;
  otp: any;
  title?: string = "Default Modal";
  signUpForm: any = FormGroup;

  @ViewChild('pass', { static: true }) passwrd: any = ElementRef;

  constructor(public bsModalRef: BsModalRef, private el: ElementRef) { }

  ngOnInit(): void { 
    this.createSignUpForm();
  }

  createSignUpForm(): void{
    this.signUpForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]+$')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassowrd: new FormControl('',[Validators.required])
    })
  }

  signUpFormClicked(data:FormGroup): void{
    debugger;
    console.log(data.value);
  }

  togglePassword(): void{
    if(this.passwrd.nativeElement.getAttribute('type') == 'password')
      this.passwrd.nativeElement.setAttribute('type', 'text');
    else
      this.passwrd.nativeElement.setAttribute('type', 'password');
  }

  signUpFormReset(): void{
    this.signUpForm.reset();
  }

  setValue(data: any): void{
    this.signUpForm.get(data).setValue('');
  }
}
