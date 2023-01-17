import { Component, OnInit } from '@angular/core';
import { AppCacheService } from '../services/app.cache.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})

export class OffersComponent implements OnInit {

  offerDetails: Array<any> = [];
  constructor(private appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.offerDetails = this.appCacheService._offersDetails;
  }

}
