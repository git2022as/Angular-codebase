import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { DishService } from 'src/app/dish/dish.service';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg, errorMessages } from '../../constants/constant';
import { mergeMap, take, tap, map } from 'rxjs/operators';
import { ShortMessageComponent } from '../short-message/short-message.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {

  @Input() itemUniqueID: any;
  latestWholeRating: Array<number>;
  latestFractionalRating: number;
  reviewInputShow: boolean = false;
  reviewForm: FormGroup;
  ratingOption = [1,2,3,4,5];
  allReviews: any = [];
  overallRating: any;
  showCancelButton: boolean = false;
  reviewId: string = "";
  errorMessages = errorMessages;

  @ViewChild("shortMessage", {read: ViewContainerRef}) shortMessage: ViewContainerRef;

  constructor(private utilityService: UtilityService,
              private dishService: DishService,
              public appCacheService: AppCacheService,
              private fb: FormBuilder,
              public commonService: CommonService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res=>{
      this.itemUniqueID = res.get('id');
    })
    this.getFullRating();
  }

  createReviewForm(): void{
    if(this.appCacheService._loggedInUser){
      this.reviewForm = this.fb.group({
        rating: [null, Validators.required],
        comment: ['', Validators.required]
      });
      this.reviewInputShow = true;
    }
  }

  reviewFormSubmit(reviewForm: FormGroup): void{
    if(this.itemUniqueID != ""){
      const uid = this.appCacheService._UID;
      const method = this.showCancelButton ? 'update' : 'add';
      this.commonService.addReviews(this.itemUniqueID, uid, reviewForm.value, method, this.reviewId).pipe(
        tap((res: any)=>{
          console.log("Review has been submitted");
          this.reviewInputShow = false;
          this.showCancelButton = false;
        }),
        mergeMap(res=>this.commonService.getReviews(this.itemUniqueID))
      ,take(1)).pipe(map((res: any)=>{
        let reviews = [];
        if(res){
          for(let key in res){
            if(res.hasOwnProperty(key)){
              if(res[key]){
                for(let key1 in res[key]){
                  if(res[key].hasOwnProperty(key1)){
                    reviews.push({...res[key][key1], id: key, reviewId: key1});
                  }
                }
              }
            }
          }
        }
        return reviews;
      })).subscribe((res: any)=>{
        if(res){
          this.allReviews = res;
          this.checkReviews();
          if(this.allReviews.length > 0)
            this.showShortMsg('Reviews have been updated.','green');
        }
      });
    }
    else{
      const errorMsg = StaticMsg.commonError;
      this.commonService.openErrorModal(errorMsg);
    }
  }

  getFullRating(): void{
    this.commonService.getReviews(this.itemUniqueID).pipe(map((res: any)=>{
      let reviews = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            if(res[key]){
              for(let key1 in res[key]){
                if(res[key].hasOwnProperty(key1)){
                  reviews.push({...res[key][key1], id: key, reviewId: key1});
                }
              }
            }
          }
        }
      }
      return reviews;
    })).subscribe((res: any)=>{
      if(res){
        this.allReviews = res;
        const reviewSection = this.checkUserReviewAvailability(this.allReviews);
        if(reviewSection){
          this.createReviewForm();
        }
        this.checkReviews();
      }
    });
  }

  checkUserReviewAvailability(data: any): boolean{
    let value = true;
    if(data.length > 0){
      data.forEach(each=>{
        if(each.user == this.appCacheService._loggedInUserEmail){
          value = false;
        }
      });
    }
    return value;
  }

  editYourComment(each: any): void{
    this.reviewId = each.reviewId;
    this.createReviewForm();
    this.reviewForm.setValue({
      rating: each.rating,
      comment: each.comment
    });
    this.showCancelButton = true;
  }

  deleteYourComment(each: any): void{
    if(this.itemUniqueID != ""){
      const uid = this.appCacheService._UID;
      this.commonService.deleteReviews(this.itemUniqueID, uid).pipe(
        tap((res: any)=>{
          console.log("Review has been deleted");
          this.reviewInputShow = true;
          this.showCancelButton = false;
          this.createReviewForm();
          this.reviewForm.setValue({
            rating: null,
            comment: ''
          });
        }),
        mergeMap(res=>this.commonService.getReviews(this.itemUniqueID))
      ,take(1)).pipe(map((res: any)=>{
        let reviews = [];
        if(res){
          for(let key in res){
            if(res.hasOwnProperty(key)){
              if(res[key]){
                for(let key1 in res[key]){
                  if(res[key].hasOwnProperty(key1)){
                    reviews.push({...res[key][key1], id: key, reviewId: key1});
                  }
                }
              }
            }
          }
        }
        return reviews;
      })).subscribe((res: any)=>{
        if(res){
          this.allReviews = res;
          this.checkReviews();
          if(this.allReviews.length > 0)
            this.showShortMsg('Reviews have been updated.','green');
        }
      });
    }
    else{
      const errorMsg = StaticMsg.commonError;
      this.commonService.openErrorModal(errorMsg);
    }
  }

  showShortMsg(msg: string, color: string): void{
    const componentRef = this.shortMessage.createComponent(ShortMessageComponent);
    componentRef.instance.message = msg;
    componentRef.instance.color = color;
    componentRef.instance.parent = this.getParent();
  }

  getParent(): any{
    return {
      callParentMethod: () => {
        this.removeShortMsg();
      }
    }
  }

  removeShortMsg(): void{
    this.shortMessage.clear();
  }

  setValue(formControlName: string): void{
    this.reviewForm.get(formControlName).setValue('');
  }

  reviewFormReset(reviewForm: FormGroup): void{
    reviewForm.reset();
  }

  checkReviews(): void{
    //calculate rating
    this.overallRating = this.utilityService.checkOverallRating(this.allReviews);
    this.latestWholeRating = this.utilityService.checkWholeRating(this.overallRating);
    this.latestFractionalRating = this.utilityService.checkFractionalRating(this.overallRating);
  }

  convertRatingToArray(rating: number): Array<any>{
    return Array(rating).fill(1);
  }

}
