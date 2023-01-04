import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  @Input() itemUniqueID: any;
  latestWholeRating: Array<number>;
  latestFractionalRating: number;

  reviews = {
    rating: 4.5,
    review: [
      {
        rating: 5,
        verifiedUser: true,
        comment: "Awesome tasty dish"
      },
      {
        rating: 4.5,
        verifiedUser: true,
        comment: "Best kebab in the house"
      },
      {
        rating: 4,
        verifiedUser: true,
        comment: "You should improve your packaging"
      }
    ]
  }
  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    //call review API
    //use itemUniqueID to Backend to fetch latest ratings details
    this.checkReviews();
  }

  checkReviews(): void{
    //get rating data
    this.latestWholeRating = this.utilityService.checkWholeRating(this.reviews.rating);
    this.latestFractionalRating = this.utilityService.checkFractionalRating(this.reviews.rating);
  }

}
