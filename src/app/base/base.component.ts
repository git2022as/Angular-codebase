import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';
import { BaseService } from './base.service';
import { GoogleMapComponent } from '../shared/google-map/google-map.component';
import { ActivatedRoute } from '@angular/router';
import { staticValue } from '../constants/constant';

/*Example of observable */
import {map, Observable, of} from 'rxjs'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
  caouselInterval: number = staticValue.caouselInterval;
  slides: any;
  allProducts: any;
  allBranches: any;
  offers: any;
  slidesSubscription: Subscription | undefined;
  dishSubscription: Subscription | undefined;
  branchSubscription: Subscription | undefined;
  offersSubscription: Subscription | undefined;
  content: any;

  constructor(
    private appCacheService: AppCacheService,
    private commonService: CommonService,
    private bsModalRef: BsModalRef,
    private baseService: BaseService,
    private bsModalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.slidesSubscription?.unsubscribe();
    this.dishSubscription?.unsubscribe();
    this.branchSubscription?.unsubscribe();
    this.offersSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    //get CONTENT DATA
    this.content = this.appCacheService._content;
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
        localStorage.setItem("slides",JSON.stringify(this.slides));
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
        localStorage.setItem("dishes",JSON.stringify(this.allProducts));
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
        localStorage.setItem("branches",JSON.stringify(this.allBranches));
      }
    })
  }

  getOffers(): void{
    this.offersSubscription = this.baseService.getOffers().pipe(map((data: any)=>{
      let products = [];
      for(let x in data){
        products.push(data[x]);
      }
      return products;
    })).subscribe((res: any)=>{
      if(res){
        this.offers = res;
        this.appCacheService._offersDetails = this.offers;
        localStorage.setItem("offersDetails",JSON.stringify(this.offers));
      }
    })
  }

  previous(): void {
    let lastValue = this.allBranches.pop()!
    this.allBranches.unshift(lastValue)
  }

  next(): void {
    let firstValue = this.allBranches.shift()!
    this.allBranches.push(firstValue)
  }

  openDialog(event: any): void {
    if(event.sec == 'call'){
      const number = Array.isArray(event.data.locationContact) ? event.data.locationContact.split(',') : event.data.locationContact;
      const timing = event.data.locatiomTiming;
      let content = [`Contact Number: ${number}`,`Timing: ${timing}`];
      const initialState: ModalOptions = {
        initialState: {
          content: content,
          title: `${event.data.branchLocation}'s Contact Details`,
          type: 'info',
          data: 'list',
          primaryButtonText: 'Cancel',
        },
      }
      this.bsModalRef = this.commonService.openStaticModal(initialState);
    }
    else{
      const latitude = event.data.latitude ? event.data.latitude : 22.5195;
      const longitude = event.data.longitude ? event.data.longitude : 88.3828;
      const initialState: ModalOptions = {
        initialState: {
          latitude: latitude,
          longitude: longitude,
          title: `${event.data.branchLocation}'s Location Details`,
        }
      }
      this.bsModalService.show(
        GoogleMapComponent, initialState)
    }
  }

  goToTopClicked(event: any): void{
    this.commonService.CommonGoToTopEvent('top');
  }

}
