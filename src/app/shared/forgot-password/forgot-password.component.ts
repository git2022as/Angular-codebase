import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { errorMessages } from 'src/app/constants/constant';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  title?: string;
  forgotFailedStatus: boolean = false;
  forgotSuccessStatus: boolean = false;
  forgotMsg: string = "";
  forgotEmailAdd: string;
  resetLinkSendStatus: boolean = false;
  errorMessages = errorMessages;
  backToSignInEvent = new EventEmitter<any>();

  constructor(private authService: AuthService,
              public bsModalRef: BsModalRef,
              public commonService: CommonService,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

  forgotSendLink(forgotPassForm: NgForm): void{
    this.authService.forgotPassword(forgotPassForm.value).subscribe((data: any)=>{
      this.forgotFailedStatus = false;
      this.forgotSuccessStatus = true;
      this.forgotMsg = `${this.appCacheService._content.forgotPasswordConfirmMsg} ${data.email}`;
      this.resetLinkSendStatus = true;
    },
    error => {
      this.forgotFailedStatus = true;
      this.forgotSuccessStatus = false;
      this.forgotMsg = error.message;
    });
  }

  backToLogin(): void{
    this.backToSignInEvent.emit();
  }

}
