import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { admin_headers } from '../constants/constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private modalService: BsModalService,
              public bsModalRef: BsModalRef,
              public appCacheService: AppCacheService,
              private commonService: CommonService) { }

  ngOnInit(): void {
  }

  openDisclaimer(): void{
    const content =  admin_headers.disclaimer;
    const initialState: ModalOptions = {
      initialState: {
        content: content,
        title: this.appCacheService._content.disclaimerText,
        type: 'info',
        data: 'list',
        primaryButtonText: 'OK',
      },
    }
    this.bsModalRef = this.commonService.openStaticModal(initialState);
  }

}
