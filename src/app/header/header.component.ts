import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../shared/login-modal/login-modal.component';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  bsModalRef?: BsModalRef;
  loggedIn: boolean = false;
  loggedInUserName: string = "";
  cartBadgeHidden: boolean = true;
  cartItemCount: string = "0";

  constructor(private modalService: BsModalService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  openLoginModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: "Login"
      }
    };
    this.bsModalRef = this.modalService.show(LoginModalComponent, initialState);

    //get event triggerd from modal component
    this.bsModalRef.content.loginClicked.subscribe((res: any) => {
      this.loggedIn = true;
      this.loggedInUserName = res?.name ? res.name : "user";
      this.bsModalRef?.hide();
    });
  }

  openLogoutModal(): void{
    const initialState: ModalOptions = {
      initialState: {
        content: 'Are you sure want to logout?',
        title: 'Logout',
        type: 'confirmation',
        data: 'para',
        secondaryButton: true,
        primaryButtonText: 'Yes'
      }
    };
    this.bsModalRef = this.modalService.show(StaticDialogNgxBootstrapComponent, initialState);
    this.bsModalRef.content.primaryButtonConfirmationEvent.subscribe((res: any) => {
      //call logout service here to clear all cache
      this.loggedIn = false;
      this.router.navigateByUrl('/base');
      this.bsModalRef?.hide();
    });
  }

  openLink(val: string): void{
    this.router.navigateByUrl('/' + val);
  }

}
