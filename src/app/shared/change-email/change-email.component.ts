import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customValidator } from 'src/app/validator/custom.validator';
import { errorMessages } from 'src/app/constants/constant';
import { Subscription } from 'rxjs';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit, OnDestroy{

  title?: string = "Change Email";
  changeEmailForm: FormGroup;
  errorMessages = errorMessages;
  changeEmailSubscription: Subscription | undefined;
  changeEmailSuccessEvent = new EventEmitter<any>();

  constructor(private authService: AuthService,
              public bsModalRef: BsModalRef,
              public commonService: CommonService,
              private fb: FormBuilder,
              private appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.createChangeEmailForm();
  }

  createChangeEmailForm(): void{
    this.changeEmailForm = this.fb.group({
      newEmail: ['',[Validators.required,Validators.email]],
    });
  }

  get changeEForm(): any{
    return this.changeEmailForm.controls;
  }

  changeEmail(changeEmailForm: FormGroup): void{
    let data = {email: '', idToken: ''};
    data.email = changeEmailForm.value.newEmail;
    data.idToken = this.appCacheService._token;
    this.changeEmailSubscription = this.authService.changeEmail(data).subscribe((data: any)=>{
      this.changeEmailSuccessEvent.emit();
    },
    error => {
      //handled globally from interceptor
    });
  }

  setValue(control): void{
    this.commonService.setControlsValueToBlank(control, 'text', this.changeEmailForm);
  }

  ngOnDestroy(): void {
    this.changeEmailSubscription?.unsubscribe();
  }

}
