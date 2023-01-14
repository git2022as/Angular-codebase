import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { DishService } from 'src/app/dish/dish.service';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { StaticMsg } from '../../constants/constant';
import { mergeMap, take, tap, map } from 'rxjs/operators';
import { ShortMessageComponent } from '../short-message/short-message.component';

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
  @ViewChild("shortMessage", {read: ViewContainerRef}) shortMessage: ViewContainerRef;

  constructor(private utilityService: UtilityService,
              private dishService: DishService,
              public appCacheService: AppCacheService,
              private fb: FormBuilder,
              public commonService: CommonService) { }

  ngOnInit(): void {
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
      this.commonService.addReviews(this.itemUniqueID,this.reviewForm.value).pipe(
        tap((res: any)=>{
          console.log("Review has been submitted");
          this.reviewInputShow = false;
          this.showCancelButton = false;
          console.log("your review has been udated");
        }),
        mergeMap(res=>this.commonService.getReviews(this.itemUniqueID))
      ,take(1)).pipe(map((res: any)=>{
        let reviews = [];
        if(res){
          for(let key in res){
            if(res.hasOwnProperty(key)){
              reviews.push({...res[key], id: key});
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
            reviews.push({...res[key], id: key});
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
    this.createReviewForm();
    this.reviewForm.setValue({
      rating: each.rating,
      comment: each.comment
    });
    this.showCancelButton = true;
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

}
