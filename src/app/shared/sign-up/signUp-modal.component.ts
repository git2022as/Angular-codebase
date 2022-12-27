import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { customValidator } from 'src/app/validator/custom.validator';

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
  isVisibility: boolean = true;

  @ViewChild('pass', { static: true }) passwrd: ElementRef;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder ) { }

  ngOnInit(): void { 
    this.createSignUpForm();
  }

  createSignUpForm(): void{
    this.signUpForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]+$')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, customValidator.passwordRequirement]),
      confirmPassword: new FormControl('',[Validators.required, customValidator.passwordMatch])
    })

    //another way to create reactive forms with FROMBUILDER
    /*this.signUpForm = this.fb.group({
      phoneNumber: ['', Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]+$')],
      name: ['', Validators.required, Validators.maxLength(40)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, customValidator.passwordRequirement],
      confirmPassword: ['', Validators.required, customValidator.passwordMatch]
    })*/
  }

  signUpFormClicked(data:FormGroup): void{
    console.log(data.value);
  }

  showPassword(): void{
    if(this.passwrd.nativeElement.getAttribute('type') == 'password')
      this.passwrd.nativeElement.setAttribute('type', 'text');
    else
      this.passwrd.nativeElement.setAttribute('type', 'password');
  }

  hidePassword(): void{
    if(this.passwrd.nativeElement.getAttribute('type') == 'text')
      this.passwrd.nativeElement.setAttribute('type', 'password');
  }

  signUpFormReset(): void{
    this.signUpForm.reset();
  }

  setValue(data: any): void{
    this.signUpForm.get(data).setValue('');
  }

  clickDisabled(event: Event): void{
    event.preventDefault();
  }
}
