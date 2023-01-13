import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  title?: string = "Forgot Password";
  forgotFailedStatus: boolean = false;
  forgotSuccessStatus: boolean = false;
  forgotMsg: string = "";
  forgotEmailAdd: string;
  resetLinkSendStatus: boolean = false;
  backToSignInEvent = new EventEmitter<any>();

  constructor(private authService: AuthService,
              public bsModalRef: BsModalRef,
              public commonService: CommonService) { }

  ngOnInit(): void {
  }

  forgotSendLink(forgotPassForm: NgForm): void{
    this.authService.forgotPassword(forgotPassForm.value).subscribe((data: any)=>{
      this.forgotFailedStatus = false;
      this.forgotSuccessStatus = true;
      this.forgotMsg = `The reset password link has been sent to your registered email address - ${data.email}`;
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
