import { Component, OnInit, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customValidator } from 'src/app/validator/custom.validator';
import { errorMessages } from 'src/app/constants/constant';
import { Subscription } from 'rxjs';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  title?: string;
  changePasswordForm: FormGroup;
  errorMessages = errorMessages;
  isVisibility: boolean = true;
  changePasswordSubscription: Subscription | undefined;
  changesPasswordSuccessEvent = new EventEmitter<any>();

  @ViewChild('pass', {static: true}) pass : ElementRef;

  constructor(private authService: AuthService,
              public bsModalRef: BsModalRef,
              public commonService: CommonService,
              private fb: FormBuilder,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.createChangePasswordForm();
  }

  createChangePasswordForm(): void{
    this.changePasswordForm = this.fb.group({
      newPassword: ['',[Validators.required,customValidator.passwordRequirement]],
      confirmPassowrd: ['', [Validators.required, customValidator.passwordChangeMatch]]
    });
  }

  get changePassForm(): any{
    return this.changePasswordForm.controls;
  }

  changePassword(changePasswordForm: FormGroup): void{
    let data = {password: '', idToken: ''};
    data.password = changePasswordForm.value.newPassword;
    data.idToken = this.appCacheService._token;
    this.changePasswordSubscription = this.authService.changePassword(data).subscribe((data: any)=>{
      this.changesPasswordSuccessEvent.emit();
    },
    error => {
      //handled globally from interceptor
    });
  }

  showHidePassword(): void{
    if(this.pass.nativeElement.getAttribute('type') == 'password')
      this.pass.nativeElement.setAttribute('type', 'text');
    else
      this.pass.nativeElement.setAttribute('type', 'password');
  }

  setValue(control): void{
    this.commonService.setControlsValueToBlank(control, 'text', this.changePasswordForm);
  }

  ngOnDestroy(): void {
    this.changePasswordSubscription?.unsubscribe();
  }

}
