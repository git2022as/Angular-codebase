import { Injectable } from '@angular/core';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private bsModalService: BsModalService){}

    openStaticModal(data: any): BsModalRef{
        return this.bsModalService.show(
            StaticDialogNgxBootstrapComponent, data)
    }
}