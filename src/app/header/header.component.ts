import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from '../shared/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  bsModalRef?: BsModalRef;
  loggedIn: boolean = false;
  loggedInUserName: string = "";

  constructor(private modalService: BsModalService) { }

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
      this.loggedInUserName = res?.name;
      this.bsModalRef?.hide();
    });
  }

}
