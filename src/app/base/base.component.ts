import {Component, OnInit, OnDestroy} from '@angular/core';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap/modal';
import {StaticDialogNgxBootstrapComponent} from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import {AppCacheService} from '../services/app.cache.service';
import {CommonService} from '../services/common.service';
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

  /* basic testing of creation of an OBSERVABLE */
    test = new Observable((res) => {
      console.log('Observable has been created')
      //Observable has 3 methods() => next, complete & error
      res.next(1)
      res.next(2)
      res.next(3)
      res.error(new Error('Hi I am an error'))
      //This data has been streamed as we will get the below output
      //1
      //2
      //3
    })

  //with OF operator
    testOF = of('Hello', [1, 2, 3, 4, 5, 6]) //OF operator will emit complete method as well

  //we need to subscribe the observable
    testSubscription: Subscription | undefined
    test1Subscription: Subscription | undefined
  /* ends here */

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
    this.appCacheService._dishesDetails = this.allProducts;
    this.appCacheService._offersDetails = this.offers;
    /***********************TESTING OF OBSERVABLE *************************/
      this.testSubscription = this.test.subscribe(
        (res: any) => {
          //SUBSCRIBER also has 3 callback options parameters => next, error, complete
          console.log(res)
        },
        (error: any) => {
          console.log(error)
        },
        () => {
          console.log('observable emitted complete signal')
        }
      )

      this.test1Subscription = this.testOF.subscribe(
        (res: any) => {
          console.log(res)
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          console.log('observable emitted complete signal')
        }
      )
    /********************** TESTING OF OBSERVABLE ENDS HERE ***************/
  }

  getCarouselSlides(): void{
    this.slidesSubscription = this.baseService.getSlides().pipe(map((data: any)=>{
      for(let x in data){
        return data[x];
      }
    })).subscribe((res: any)=>{
      if(res){
        this.slides = res;
      }
    });
  }

  getDishDetails(): void{
    this.dishSubscription = this.baseService.getDish().pipe(map((data: any)=>{
      for(let x in data){
        return data[x];
      }
    })).subscribe((res: any)=>{
      if(res.success){
        this.allProducts = res.data;
      }
    });
  }

  getBranches(): void{
    this.branchSubscription = this.baseService.getBranches().pipe(map((data: any)=>{
      for(let x in data){
        return data[x];
      }
    })).subscribe((res: any)=>{
      if(res.success){
        this.allBranches = res.data;
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
    const number = event.contact.split(',')
    const initialState: ModalOptions = {
      initialState: {
        content: number,
        title: `${event.location}'s Contact Details`,
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
