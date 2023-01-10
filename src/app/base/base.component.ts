import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { BaseService } from './base.service';

/*Example of observable */
import {map, Observable, of} from 'rxjs'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
  title: string = 'kebabHouse'
  caouselInterval: number = 2000;
  slides: any;
  allProducts: any;
  allBranches: any;
  offers: any;
  slidesSubscription: Subscription | undefined;
  dishSubscription: Subscription | undefined;
  branchSubscription: Subscription | undefined;
  offersSubscription: Subscription | undefined;

  constructor(
    private appCacheService: AppCacheService,
    private commonService: CommonService,
    private bsModalRef: BsModalRef,
    private baseService: BaseService
  ) {}

  ngOnDestroy(): void {
    this.slidesSubscription?.unsubscribe();
    this.dishSubscription?.unsubscribe();
    this.branchSubscription?.unsubscribe();
    this.offersSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    //call 4 APIs => dish, offers, card-carosul & branches
    this.getCarouselSlides();
    this.getDishDetails();
    this.getBranches();
    this.getOffers();
  }

  getCarouselSlides(): void{
    this.slidesSubscription = this.baseService.getSlides().pipe(map((data: any)=>{
      let products = [];
      for(let x in data){
        products.push(data[x]);
      }
      return products;
    })).subscribe((res: any)=>{
      if(res){
        this.slides = res;
      }
    });
  }

  getDishDetails(): void{
    this.dishSubscription = this.baseService.getDish().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe((res: any)=>{
      if(res){
        this.allProducts = res;
        this.appCacheService._dishesDetails = this.allProducts;
        console.log(this.allProducts);
      }
    });
  }

  getBranches(): void{
    this.branchSubscription = this.baseService.getBranches().pipe(map((data: any)=>{
      let products = []
      for(let x in data){
        products.push(data[x]);
      }
      return products;
    })).subscribe((res: any)=>{
      if(res){
        this.allBranches = res;
      }
    })
  }

  getOffers(): void{
    this.offersSubscription = this.baseService.getOffers().pipe(map((data: any)=>{
      for(let x in data){
        return data[x];
      }
    })).subscribe((res: any)=>{
      if(res.success){
        this.offers = res.data;
        this.appCacheService._offersDetails = this.offers;
      }
    })
  }

  myEvent(evt: string) {
    console.log(evt)
  }

  previous(): void {
    let lastValue = this.allBranches.pop()!
    this.allBranches.unshift(lastValue)
  }

  next(): void {
    let firstValue = this.allBranches.shift()!
    this.allBranches.push(firstValue)
  }

  openPhoneDialog(event: any): void {
    const number = Array.isArray(event.locationContact) ? event.locationContact.split(',') : event.locationContact;
    const timing = event.locatiomTiming;
    let content = [`Contact Number: ${number}`,`Timing: ${timing}`];
    const initialState: ModalOptions = {
      initialState: {
        content: content,
        title: `${event.branchLocation}'s Contact Details`,
        type: 'info',
        data: 'list',
        primaryButtonText: 'Cancel',
      },
    }
    this.bsModalRef = this.commonService.openStaticModal(initialState)
  }

  goToTopClicked(event): void{
    this.commonService.CommonGoToTopEvent('top');
  }

}
