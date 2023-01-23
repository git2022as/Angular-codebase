import { Component, OnInit, ElementRef, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { customValidator } from 'src/app/validator/custom.validator';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { signUpResponseInterface } from 'src/app/interface/project.interface';
import { Subscription } from 'rxjs';
import { errorMessages, StaticMsg } from '../../constants/constant';

@Component({
  selector: 'app-signUp-modal',
  templateUrl: './signUp-modal.component.html',
  styleUrls: ['./signUp-modal.component.scss']
})
export class SignUpModalComponent implements OnInit, OnDestroy {

  //phoneNumber: any;
  //otp: any;
  title?: string = "Default Modal";
  signUpForm: any = FormGroup;
  isVisibility: boolean = true;
  signUpFailedStatus: boolean = false;
  signUpSuccessStatus: boolean = false;
  SignUpMsg: string = "";
  signUpSuccessfulEvent = new EventEmitter<any>();
  signUpSubscription: Subscription | undefined;
  errorMessages = errorMessages;
  staticMsg = StaticMsg;

  @ViewChild('pass', { static: true }) passwrd: ElementRef;

  constructor(public bsModalRef: BsModalRef, 
              private fb: FormBuilder,
              private authService: AuthService,
              public commonService: CommonService) { }

  ngOnInit(): void { 
    this.createSignUpForm();
  }

  createSignUpForm(): void{
    this.signUpForm = new FormGroup({
      //phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]+$')]),
      //name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, customValidator.passwordRequirement, Validators.maxLength(10), Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, customValidator.passwordMatch, Validators.maxLength(10), Validators.minLength(6)])
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
    this.signUpSubscription = this.authService.createUser(data.value).subscribe((res: signUpResponseInterface)=>{
        console.log("registration done " + JSON.stringify(res));
        this.signUpFailedStatus = false;
        this.signUpSuccessStatus = true;
        this.SignUpMsg = "Sign Up is Successful";
        setTimeout(()=>{
          this.signUpSuccessfulEvent.emit(true);
        },2000);
      },
      (error: any)=>{
        //handled globally from interceptor
        this.signUpFailedStatus = true;
        this.SignUpMsg = error.error.error.message;
      }
    )
  }

  /*access form control - getter method*/
  get signForm(){
    return this.signUpForm.controls;
  }

  showHidePassword(): void{
    if(this.passwrd.nativeElement.getAttribute('type') == 'password')
      this.passwrd.nativeElement.setAttribute('type', 'text');
    else
      this.passwrd.nativeElement.setAttribute('type', 'password');
  }

  signUpFormReset(): void{
    this.signUpForm.reset();
    this.passwrd.nativeElement.setAttribute('type', 'password');
    this.signUpFailedStatus = false;
    this.SignUpMsg = "";
  }

  setValue(data: any): void{
    this.signUpForm.get(data).setValue('');
  }

  clickDisabled(event: Event): void{
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.signUpSubscription?.unsubscribe();
  }

}
